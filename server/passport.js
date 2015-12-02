var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/**
 * @constructor
 * @param {LadderSystem} ladderSystem
 */
var Passport = function(ladderSystem) {

    /** @type {LadderSystem} */
    this.ladderSystem = ladderSystem;

    /** @type {*} */
    this.passport = passport;
};

/**
 * Listen for google authentication callbacks.
 */
Passport.prototype.listen = function() {
    var GOOGLE_CLIENT_ID = "240168395136-l0liredkmjnih42sc6rj2jrtf40ed1l1.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET = "hWVz3oZ9PNP4xH7VWGf6XD4r",
        sql = this.ladderSystem.sql,
        domain = this.ladderSystem.config.domain;

    this.passport.serializeUser(function(user, done) {
        done(null, user);
    });

    this.passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    this.passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: domain + "/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function() {
                sql.getUserByEmail(profile.emails[0].value, function(err, user) {
                    if (user != null) {
                        console.log('Successful login', user.getEmail());
                        done(null, {email: user.getEmail(), user_id: user.getUserId()});
                    } else {
                        console.log('Unsuccessful login', profile.emails[0]);
                        done(null, profile);
                    }
                });
                return true;
            });
        }
    ));

    // Listen for auth requests
    this.ladderSystem.app.get('/auth/google',
        passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}),
        function(req, res) { }
    );

    // Listen for auth callback requests.
    this.ladderSystem.app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/login'}),
        function(req, res) {
            res.redirect('/');
        }
    );
};
/** @type {Function} */
module.exports = Passport;