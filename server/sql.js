var mysql = require('mysql'),
    Users = require('./users'),
    User = require('./user'),
    Challenges = require('./challenges');

/**
 * @constructor
 * @param {LadderSystem} ladderSystem
 */
var SQL = function(ladderSystem) {
    /** @type {string} */
    this.host = ladderSystem.config.sqlhost;

    /** @type {string} */
    this.user = ladderSystem.config.sqluser;

    /** @type {string} */
    this.password = ladderSystem.sqlPassword;

    /** @type {string} */
    this.database = ladderSystem.config.sqldatabase;
};

/**
 * @return {Connection}
 */
SQL.prototype.getConnection = function() {
    return mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
    });
};

/**
 * @param {string} query
 * @param {?Array.<*>} formatArgs
 * @param {function(?Error, ?*)} callback
 */
SQL.prototype.selectOne = function(query, formatArgs, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query(query, formatArgs, function(err, rows) {
        if (err) {
            throw err
        }

        if (rows.length === 1) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    });
    connection.end();
};

/**
 * @param {string} query
 * @param {?Array.<*>} formatArgs
 * @param {function(?Error, ?*)} callback
 */
SQL.prototype.selectArray = function(query, formatArgs, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query(query, formatArgs, function(err, rows) {
        if (err) {
            throw err
        }
        callback(null, rows.length > 0 ? rows : []);
    });
    connection.end();
};

/**
 * @param {string} email
 * @param {function(?Error, ?User)} callback
 */
SQL.prototype.getUserByEmail = function(email, callback) {
    this.selectOne('SELECT * FROM users WHERE email = ?', [email], function(err, userData) {
        callback(err, userData ? new User(userData) : null);
    });
};

/**
 * @param {number} userId
 * @param {function(?Error, ?User)} callback
 */
SQL.prototype.getUserByUserId = function(userId, callback) {
    this.selectOne('SELECT * FROM users WHERE user_id = ?', [userId], function(err, userData) {
        callback(err, userData ? new User(userData) : null);
    });
};

/**
 * @param {function(?Error, ?Users)} callback
 */
SQL.prototype.getUsers = function(callback) {
    this.selectArray('SELECT * FROM users ORDER BY ladder_position', null, function(err, usersData) {
        callback(err, new Users(usersData));
    });
};

/**
 * @param {function(?Error, ?Challenges)} callback
 */
SQL.prototype.getChallenges = function(callback) {
    this.selectArray('SELECT * FROM challenges', null, function(err, challengesData) {
        callback(err, new Challenges(challengesData));
    });
};

/**
 * @param {number} challengerId
 * @param {number} opponentId
 * @param {function(?Error, number)} callback Error and insert id.
 */
SQL.prototype.insertChallenge = function(challengerId, opponentId, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query('INSERT INTO challenges (challenger_id, opponent_id, time) VALUES (?, ?, ?)', [challengerId, opponentId, Date.now()], function(err, resultSet) {
        if (err) {
            throw err;
        }
        if (resultSet.affectedRows === 0) {
            throw 'No rows where inserted';
        }
        callback(null, resultSet.insertId);
    });
    connection.end();
};

/**
 * @param {number} challengeId
 * @param {function(?Error)} callback
 */
SQL.prototype.removeChallenge = function(challengeId, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query('DELETE FROM challenges WHERE challenge_id = ?', [challengeId], function(err, resultSet) {
        if (err) {
            throw err;
        }
        if (resultSet.affectedRows === 0) {
            throw 'No challenges deleted. ' + challengeId;
        }
        callback(null);
    });
    connection.end();
};

/**
 * @param {number} userId
 * @param {number} newLadderPosition
 * @param {function(?Error)} callback
 */
SQL.prototype.updateUserLadderPosition = function(userId, newLadderPosition, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query('UPDATE users SET ladder_position = ? WHERE user_id = ?', [newLadderPosition, userId], function(err, resultSet) {
        if (err) {
            throw err;
        }
        if (resultSet.affectedRows === 0) {
            throw 'No user positions where updated.';
        }
        callback(null);
    });
    connection.end();
};

/**
 * @param {number} userId
 * @param {number} fromLadderPosition
 * @param {number} toLadderPosition
 * @param {function(?Error)} callback
 */
SQL.prototype.insertPositionChange = function(userId, fromLadderPosition, toLadderPosition, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query('INSERT INTO position_changes (user_id, from_ladder_position, to_ladder_position, time) VALUES (?, ?, ?, ?)', [userId, fromLadderPosition, toLadderPosition, Date.now()], function(err, resultSet) {
        if (err) {
            throw err;
        }
        if (resultSet.affectedRows === 0) {
            throw 'No rows where inserted';
        }
        callback(null);
    });
    connection.end();
};

/**
 * @param {number} challengerId
 * @param {number} opponentId
 * @param {function(?Error, number)} callback Error and insertId
 */
SQL.prototype.insertMatch = function(challengerId, opponentId, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query('INSERT INTO matches (challenger_id, opponent_id, time) VALUES (?, ?, ?)', [challengerId, opponentId, Date.now()], function(err, resultSet) {
        if (err) {
            throw err;
        }
        if (resultSet.affectedRows === 0) {
            throw 'No rows where inserted';
        }
        callback(null, resultSet.insertId);
    });
    connection.end();
};

/**
 * @param {number} matchSetIndex
 * @param {number} matchId
 * @param {number} userId
 * @param {number} score
 * @param {function(?Error)} callback
 */
SQL.prototype.insertMatchScore = function(matchSetIndex, matchId, userId, score, callback) {
    var connection = this.getConnection();
    connection.connect();
    connection.query('INSERT INTO match_scores (match_id, match_set_index, user_id, score) VALUES (?,?,?,?)', [matchId, matchSetIndex, userId, score], function(err, resultSet) {
        if (err) {
            throw err;
        }
        if (resultSet.affectedRows === 0) {
            throw 'No rows where inserted';
        }
        callback(null);
    });
    connection.end();
};

/** @type {Function} */
module.exports = SQL;