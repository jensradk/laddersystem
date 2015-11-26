var User = require('./user');

/**
 * @constructor
 * @param {!Array.<{user_id: number, email: string, nickname: string, ladder_position: string}>} usersData
 */
var Users = function(usersData) {
    var users = [];

    usersData.forEach(function(userData) {
        users.push(new User(userData));
    });

    /** @type {!Array.<!User>} @private */
    this.users_ = users;
};

/**
 * @template S
 * @param {function(!User, number, !Array.<!User>)} callback
 * @param {S=} opt_thisArg
 */
Users.prototype.forEach = function(callback, opt_thisArg) {
    this.users_.forEach(callback, opt_thisArg);
};

/** @type {Function} */
module.exports = Users;