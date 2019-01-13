import { Player } from './player';
import { Referee } from "./referee";

export class Orginizer {
    public players: Player[] = [];
    public couples: { [key: number]: Player[]; };
    public refeeres: Referee[];
    public winnersOfFirstRound: Player[] = [];
    public semiFinal1: Player[] = [];
    public semiFinal2: Player[] = [];
    public winnerOfsemi1: Player | null;
    public winnerOfsemi2: Player | null;
    public finalWinner: Player | null;
    public playersBackUp: Player[] = [];
    constructor(public playersNames: string[]) {
        this.refeeres = [];
        this.couples = {
            1: [],
            2: [],
            3: [],
            4: [],
        }
        this.winnerOfsemi1 = null;
        this.winnerOfsemi2 = null;
        this.finalWinner = null;
    }

    genarateCouples() {
        while (this.players.length > 0) {
            for (var i = 1; i <= 4; i++) {
                for (var j = 0; j <= 1; j++) {
                    let rand = Math.floor(Math.floor(Math.random() * (this.players.length - 0)) + 0);
                    this.couples[i].push(this.players[rand]);
                    this.playersBackUp.push(this.playersBackUp[rand]);
                    this.players.splice(rand, 1);
                }
            }
        }
        return this.couples;
    }

    generatePlayerSkill(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    generatePlayers() {
        this.playersNames.forEach(playerName => {
            this.players.push(new Player(playerName, this.generatePlayerSkill(1, 10)));
        });
    }

    createReferee(playerA: Player, playerB: Player): any {
        this.refeeres.push(new Referee(playerA, playerB));
    }

    startPhaseOne() {

        this.generatePlayers();
        console.log(`Phase 1! Players: ${this.players.length}`)
        var couples = this.genarateCouples();
        for (var i = 1; i <= 4; i++) {
            this.createReferee(couples[i][0], couples[i][1]);
        }
        console.log('\n--Τhe 4 couples were separated----');
        console.log(couples);
        console.log('/--------------------------------------/\n');
        console.log(`Starting first games`)
        for (var i = 0; i < 4; i++) {
            console.log(`Match ${i + 1}`);
            this.winnersOfFirstRound[i] = this.refeeres[i].game();
        }
        console.log('/------------------------/')
        console.log(`winners of first Round: `);
        console.log(this.winnersOfFirstRound);
        console.log('/------------------------/\n')

        console.log('Starting Phase 2')
        this.startPhaseTwo();
        console.log('\nFirst Semi Final\n')
        this.winnerOfsemi1 = new Referee(this.semiFinal1[0], this.semiFinal1[1]).game();
        console.log('/------------------------/\n')
        console.log('\nSecond Semi Final\n')
        this.winnerOfsemi2 = new Referee(this.semiFinal2[0], this.semiFinal2[1]).game();
        console.log('/------------------------/\n')
        console.log(`Winner of semi1 : ${this.winnerOfsemi1.name}`)
        console.log(`Winner of semi2 : ${this.winnerOfsemi2.name}`)
        this.winnerOfsemi1.score = 0;
        this.winnerOfsemi2.score = 0;
        this.winnerOfsemi1.winningSets = 0;
        this.winnerOfsemi2.winningSets = 0;
        console.log('/------------------------/\n')
        console.log('Final round')
        console.log(`Players: ${this.winnerOfsemi1.name} - ${this.winnerOfsemi2.name}`);
        console.log('/------------------------/\n')
        this.finalWinner = new Referee(this.winnerOfsemi1, this.winnerOfsemi2).game();
        console.log('/------------------------/')
        console.log(`FINAL WINNER : ${this.finalWinner.name} !!!!!!!!!!!!!`);
    }

    startPhaseTwo() {
        for (var i = 0; i < 4; i++) {
            this.winnersOfFirstRound[i].score = 0;
            this.winnersOfFirstRound[i].winningSets = 0;
        }
        this.semiFinal1.push(this.winnersOfFirstRound[0])
        this.semiFinal1.push(this.winnersOfFirstRound[1])
        this.semiFinal2.push(this.winnersOfFirstRound[2])
        this.semiFinal2.push(this.winnersOfFirstRound[3])
        console.log('First semiFinal: ');
        console.log(this.semiFinal1)
        console.log('Second semiFinal: ');
        console.log(this.semiFinal2)
    }


}





