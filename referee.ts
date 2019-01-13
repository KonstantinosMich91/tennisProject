import { Player } from "./player";

export class Referee {
    public currentSet = 1;
    public players: Player[];
    public whoServes: any;
    public whoHasTheBall: Player;
    public whoHasntTheBall: Player;
    public playerThatServesSecond: Player;

    constructor(public playerA: Player, public playerB: Player) {
        this.players = [playerA, playerB];
        this.playerA = this.players[0];
        this.playerB = this.players[1];
        this.whoServes = this.players[Math.floor(Math.random() * 2)];
        if (this.whoServes === this.players[0]) {
            this.playerThatServesSecond = this.players[1];
            this.whoHasTheBall = this.players[0];
            this.whoHasntTheBall = this.players[1];
        } else {
            this.playerThatServesSecond = this.players[0];
            this.whoHasTheBall = this.players[1];
            this.whoHasntTheBall = this.players[0];
        }
    }

    changeWhoHasTheBall() {
        if (this.playerA === this.whoHasTheBall) {
            this.whoHasTheBall = this.playerB;
            this.whoHasntTheBall = this.playerA;
        } else {
            this.whoHasTheBall = this.playerA;
            this.whoHasntTheBall = this.playerB;
        }
    }

    point(player: Player, set: number): any {
        let shot = player.throw();
        console.log(`${player.name} throw the ball with ${shot} power`);
        if (this.whoHasntTheBall.defense(shot)) {
            this.changeWhoHasTheBall();
            return this.point(this.whoHasTheBall,set);
        } else {
            console.log(`${player.name} won the point `)
         
            player.score++;
            if(player === this.whoServes && set === 2){
                this.changeWhoHasTheBall();
            }
            if(player ===  this.playerThatServesSecond && set === 1 ){
                this.changeWhoHasTheBall();
            }
            if (player.score === 6) {
                player.winningSets++;
                return;
            }
            this.point(this.whoHasTheBall,set);
        }
    }

    set(whoServes: Player, set : number) {
        while (this.playerA.score < 6 && this.playerB.score < 6) {
            this.point(whoServes,set);
        }
        console.log('/-------------------------------------------/');
        console.log('SET results:');
        console.log(`${this.playerA.name}  score : ${this.playerA.score} `)
        console.log(`${this.playerB.name}  score : ${this.playerB.score} `)

    }

    game() {
        console.log('/****-------------------------------------------*****/')
        console.log(`Player 1 : ${this.playerA.name}, SkillLevel: ${this.playerA.skillLevel} `)
        console.log(`Player 2 : ${this.playerB.name}, SkillLevel: ${this.playerB.skillLevel} `)
        console.log('First server of the game: ' + this.whoServes.name)
        console.log('/****-------------------------------------------*****/')

        this.set(this.whoServes,1);
        this.playerA.score = 0;
        this.playerB.score = 0;
        console.log('Second server: ' + this.playerThatServesSecond.name)
        console.log('/-------------------------------------------/');
        this.changeWhoHasTheBall();
        this.set(this.playerThatServesSecond,2);
        if (this.playerA.winningSets === 1 && this.playerB.winningSets === 1) {
            this.playerA.score = 0;
            this.playerB.score = 0;
            console.log('/-------------------------------------------/');
            this.set(this.whoServes, 3);

        }
        if (this.playerA.winningSets > this.playerB.winningSets) {
            console.log('//===============================//')
            console.log(`winner of the game : ${this.playerA.name}`)
            console.log('//===============================//');
            
            
            return this.playerA;
        } else {
            console.log('//===============================//')
            console.log(`winner of the game : ${this.playerB.name}`)
            console.log('//===============================//')
            return this.playerB;
        }
    }
}
