import readline from 'readline-sync';
import Encryptor from './encryptor.js';
import Helper from './helper.js';
import Logic from './logic.js';
import {result} from './logic.js';

class App{
    constructor(args){
        this.args=Array.from(args);
    }
    launch(){
        if (!this.verifyArgs(this.args)) return;
        
        const encryptor = new Encryptor();
        const helper = new Helper(this.args);
        const logic = new Logic(this.args.length);
        
        let gameContinues = true;

        while (gameContinues){

            const key = encryptor.generateKey();
            const computerMove = Math.floor(Math.random() * this.args.length);
            const hmac = encryptor.generateHMAC(this.args[computerMove], key);
            console.log('\nHMAC: ' + hmac);

            console.log("Available Moves:");
            this.args.forEach(arg=>{
                console.log(this.args.indexOf(arg)+1+' - '+ arg);
            });

            console.log("0 - Exit");
            console.log("? - Help");
            
            const menuChoise = readline.question('Enter your move: ');
            if (menuChoise == '?'){
                helper.print();
                console.log('\n');
                continue;
            } else if (menuChoise == '0'){
                gameContinues = false;
                continue;
            }
            
            const playerMove = Number.parseInt(menuChoise);
            if (isNaN(menuChoise) || playerMove <= 0 || playerMove > this.args.length){
                console.log('\n');
                continue;
            }
            
            console.log('\nYour move: ', this.args[playerMove - 1]);
            console.log('Computer move: ', this.args[computerMove]);
            
            switch (logic.decide(computerMove, playerMove - 1)){
                case result.WIN:{
                    console.log('You won!');
                    break;
                }
                case result.LOSE:{
                    console.log('You lost!');
                    break;
                }
                default:{
                    console.log('Draw!');
                    break;
                }
            }
            
            console.log('Key: ',key,'\n');
            }
    }
    
    verifyArgs(args){
        if (args.length < 3 || args.length % 2 == 0){
                console.log('Invalid options: please pass odd number of moves (3 or more).');
                return false;
            }
            if (new Set(args).size !== args.length){
                console.log('Invalid options: all moves must be distinct.');
                return false;
            }
            return true;
    }
}

const app=new App(process.argv.slice(2).map(arg=>arg.toLowerCase()));
app.launch();