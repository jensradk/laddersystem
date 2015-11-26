var Challenge = require('./challenge');

/**
 * @constructor
 * @param {!Array.<{opponent_id: number, challenger_id: number, challenge_id: number}>} challengesData
 */
var Challenges = function(challengesData) {
    var challenges = [];

    challengesData.forEach(function(challengeData) {
        challenges.push(new Challenge(challengeData));
    });

    /** @type {!Array.<!Challenge>} @private */
    this.challenges_ = challenges;
};

/**
 * @param {number} opponentId
 * @param {number} challengerId
 * @return {number} Challenge id or -1
 */
Challenges.prototype.getChallengeIdByUsers = function(opponentId, challengerId) {
    var challengeId = -1;
    this.challenges_.forEach(function(challenge) {
        if (challenge.getOpponentId() === opponentId && challenge.getChallengerId() === challengerId) {
            challengeId = challenge.getChallengeId();
        }
    });
    return challengeId;
};

/**
 * @param {number} userId
 * @return {boolean}
 */
Challenges.prototype.isInChallenge = function(userId) {
    var partOfChallenge = false;
    this.challenges_.forEach(function(challenge) {
        if (challenge.getOpponentId() === userId || challenge.getChallengerId() === userId) {
            partOfChallenge = true;
        }
    });
    return partOfChallenge;
};

/**
 * @template S
 * @param {function(!Challenge, number, !Array.<!Challenge>)} callback
 * @param {S=} opt_thisArg
 */
Challenges.prototype.forEach = function(callback, opt_thisArg) {
    this.challenges_.forEach(callback, opt_thisArg);
};

/** @type {Function} */
module.exports = Challenges;