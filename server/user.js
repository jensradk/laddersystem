/**
 * @constructor
 * @param {{user_id: number, email: string, nickname: string, ladder_position: number}} userData
 */
var User = function(userData) {
    /** @type {{user_id: number, email: string, nickname: string, ladder_position: number}} @private */
    this.userData_ = userData;
};

/**
 * @return {number}
 */
User.prototype.getUserId = function() {
    return this.userData_.user_id;
};

/**
 * @return {string}
 */
User.prototype.getEmail = function() {
    return this.userData_.email;
};

/**
 * @return {string}
 */
User.prototype.getNickname = function() {
    return this.userData_.nickname;
};

/**
 * @return {number}
 */
User.prototype.getLadderPosition = function() {
    return this.userData_.ladder_position;
};

/** @type {Function} */
module.exports = User;