"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(name, skillLevel) {
        this.name = name;
        this.skillLevel = skillLevel;
        this.hasBall = false;
        this.score = 0;
        this.winningSets = 0;
        this.lostInFirstRound = false;
        this.lostInSeconRound = false;
        this.lostInThirdRound = false;
    }
    Player.prototype.throw = function () {
        this.hasBall = false;
        return Math.floor(Math.random() * 10) + 1;
    };
    Player.prototype.defense = function (incBall) {
        this.hasBall = true;
        return this.skillLevel >= incBall;
    };
    return Player;
}());
exports.Player = Player;
