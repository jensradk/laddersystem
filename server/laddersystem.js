var Passport = require('./passport'),
    SQL = require('./sql'),
    ChallengesUtil = require('./challenges'),
    appDir = process.cwd(),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    async = require('async'),
    sqlPassword = process.argv[2];

/**
 * @constructor
 */
var LadderSystem = function() {

    /** @type {*} */
    this.app = express();

    /** @type {SQL} */
    this.sql = new SQL(sqlPassword);

    /** @type {Passport} */
    this.passport = new Passport(this);

    // Middleware ensures users are logged in.
    this.ensureAuthenticated = function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth/google');
    };

    this.configure();
    this.passport.listen();
    this.listenRoot();
    this.listenSendChallenge();
    this.listenSendResult();

    this.app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

/**
 * Configures express and nunjucks.
 */
LadderSystem.prototype.configure = function() {
    this.app.use(cookieParser());
    this.app.use(session({secret: 'ilovescotchscotchyscotchscotch', resave: false, saveUninitialized: false})); // session secret
    this.app.use(this.passport.passport.initialize());
    this.app.use(this.passport.passport.session());
    this.app.use(express.static(appDir));
    this.app.use(bodyParser.json());

    nunjucks.configure('', {
        autoescape: true,
        express: this.app
    });
};

/**
 * Listen for root requests
 */
LadderSystem.prototype.listenRoot = function() {
    var sql = this.sql;
    this.app.get('/', this.ensureAuthenticated, function(req, res) {
        async.parallel(
            {
                challenges: function(callback) {
                    sql.getChallenges(callback);
                },
                users: function(callback) {
                    sql.getUsers(callback);
                },
                myUser: function(callback) {
                    sql.getUserByUserId(req.user.user_id, callback);
                }
            },
            function(err, results) {
                var challenges = results.challenges,
                    users = results.users,
                    myUser = results.myUser,
                    myUserInChallenge = true,
                    nunjucksUsers = [];

                if (myUser != null) {
                    myUserInChallenge = challenges.isInChallenge(myUser.getUserId());
                }

                users.forEach(function(user) {
                    var positionCheck = myUser ? user.getLadderPosition() === myUser.getLadderPosition() - 1 : false,
                        positionCheck1 = myUser ? user.getLadderPosition() === myUser.getLadderPosition() - 2 : false,
                        userInChallenge = challenges.isInChallenge(user.getUserId());

                    nunjucksUsers.push({
                        userId: user.getUserId(),
                        email: user.getEmail(),
                        ladderPosition: user.getLadderPosition(),
                        challengable: !userInChallenge && !myUserInChallenge && (positionCheck || positionCheck1),
                        challengeId: myUser ? challenges.getChallengeIdByUsers(myUser.getUserId(), user.getUserId()) : -1,
                        opponentEmail: myUser ? myUser.getEmail() : '',
                        opponentUserId: myUser ? myUser.getUserId() : -1
                    });
                });

                res.render('client/index.html', {users: nunjucksUsers});
            }
        );
    }.bind(this));
};

/**
 * Listen for send_result request.
 */
LadderSystem.prototype.listenSendResult = function() {
    var sql = this.sql,
        throwError = function(err) {
            if (err) {
                throw err;
            }
        };
    this.app.post('/send_result', this.ensureAuthenticated, function(req, res) {
        var challengeId = req.body.challenge_id,
            opponentId = req.body.opponent_id,
            challengerId = req.body.challenger_id,
            sets = req.body.sets,
            challengerSets = 0,
            opponentSets = 0,
            waterFallList = [];

        sets.forEach(function(matchSet) {
            if (matchSet.challenger_score > matchSet.opponent_score) {
                challengerSets++;
            } else if (matchSet.challenger_score < matchSet.opponent_score) {
                opponentSets++
            } else {
                throw 'Scores were even. ' + opponentId + ' ' + challengerId;
            }
        });

        if (challengerSets === opponentSets) {
            throw 'Players have won the same amount of sets.';
        }

        // Look up challenger.
        waterFallList.push(function(callback) {
            console.log('Challenger', challengerId);
            sql.getUserByUserId(challengerId, callback);
        });

        // Look up opponent.
        waterFallList.push(function(challenger, callback) {
            console.log('Opponent', opponentId);
            sql.getUserByUserId(opponentId, function(error, opponent) {
                callback(error, challenger, opponent);
            });
        });

        // Change positions if needed.
        waterFallList.push(function(challenger, opponent, callback) {
            console.log('Change Positions', challenger.getUserId(), opponent.getUserId());
            if (challengerSets > opponentSets) {
                var parallelList = [];
                // Update challengers position.
                parallelList.push(function(callback) {
                    sql.updateUserLadderPosition(challenger.getUserId(), opponent.getLadderPosition(), callback);
                });
                // Update opponents position.
                parallelList.push(function(callback) {
                    sql.updateUserLadderPosition(opponent.getUserId(), challenger.getLadderPosition(), callback);
                });

                // Add position change
                parallelList.push(function(callback) {
                    sql.insertPositionChange(opponent.getUserId(), opponent.getLadderPosition(), challenger.getLadderPosition(), callback);
                });

                // Add position change
                parallelList.push(function(callback) {
                    sql.insertPositionChange(challenger.getUserId(), challenger.getLadderPosition(), opponent.getLadderPosition(), callback);
                });

                async.parallel(parallelList, function(err) {
                    throwError(err);
                    callback(null);
                });
            } else {
                callback(null);
            }
        });

        // Insert match.
        waterFallList.push(function(callback) {
            console.log('Insert Match', challengerId, opponentId);
            sql.insertMatch(challengerId, opponentId, callback);
        });

        // Insert match sets.
        waterFallList.push(function(matchId, callback) {
            var parallelList = [];
            sets.forEach(function(matchSet, index) {
                parallelList.push(function(callback) {
                    console.log('Insert Match Set', index, matchId, challengerId, opponentId, matchSet.challenger_score, matchSet.opponent_score);
                    sql.insertMatchSet(index, matchId, challengerId, opponentId, matchSet.challenger_score, matchSet.opponent_score, callback);
                });
            });
            async.parallel(parallelList, function(err) {
                throwError(err);
                callback(null);
            });
        });

        // Remove the challenge.
        waterFallList.push(function(callback) {
            console.log('Remove Challenge');
            sql.removeChallenge(challengeId, callback);
        });

        // When waterfall is done, return success as response.
        async.waterfall(waterFallList, function (err, result) {
            throwError(err);
            res.send({'success': true});
        });
    });
};

/**
 * Listen for send_challenge requests
 */
LadderSystem.prototype.listenSendChallenge = function() {
    var sql = this.sql;
    this.app.post('/send_challenge', this.ensureAuthenticated, function(req, res) {
        var challengerId = req.user.user_id,
            opponentId = req.body.user_id;

        console.log(challengerId, 'challenged', opponentId);

        sql.insertChallenge(challengerId, opponentId, function() {
            res.send({'success': true});
        });
    });
};

/**
 * Start webserver listen on given port.
 * @param {number} port
 */
LadderSystem.prototype.listen = function(port) {
    this.app.listen(port);
};

var ladderSystem = new LadderSystem();
ladderSystem.listen(4404);

