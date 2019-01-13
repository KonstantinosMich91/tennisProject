export class Player {
    public hasBall: boolean = false;
    public score: number = 0;
    public winningSets: number = 0;
    public lostInFirstRound: boolean = false;
    public lostInSeconRound: boolean = false;
    public lostInThirdRound: boolean = false;
    constructor(public name: string, public skillLevel: number) {}
    throw() {
        this.hasBall = false;
        return Math.floor(Math.random() * 10) + 1;
    }
    defense(incBall: number) {
        this.hasBall = true;
        return this.skillLevel >= incBall;
    }
}