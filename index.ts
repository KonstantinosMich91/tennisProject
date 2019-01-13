import { Referee } from './referee';
import { Orginizer } from './organizer';
import { Player } from './player';


let player1 = new Player('nick',7);
let player2 = new Player('john',7);

// let testReferee = new Referee(player1,player2);

// testReferee.game();
let players = ['Andreas T', 'Thodoris','Yiannis','Ioannis','Konstantinos','Andreas K','Theofilos','George'];

let organ = new Orginizer(players);
organ.startPhaseOne();