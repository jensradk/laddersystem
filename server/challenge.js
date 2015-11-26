/**
 * @constructor
 * @param {{challenge_id: number, challenger_id: number, opponent_id: number, time: number}} challengeData
 */
var Challenge = function(challengeData) {
    /** @type {{challenge_id: number, challenger_id: number, opponent_id: number, time: number}} @private */
    this.challengeData_ = challengeData;
};

/**
 * @return {number}
 */
Challenge.prototype.getChallengeId = function() {
    return this.challengeData_.challenge_id;
};

/**
 * @return {number}
 */
Challenge.prototype.getChallengerId = function() {
    return this.challengeData_.challenger_id;
};

/**
 * @return {number}
 */
Challenge.prototype.getOpponentId = function() {
    return this.challengeData_.opponent_id;
};

/** @type {Function} */
module.exports = Challenge;