import WordTable from 'word-table';
import Logic from './logic.js';

export default class Helper {
    constructor(names){
        this.names=Array.from(names);
    }
    print(){
        const header=['PC \\ User'];
        this.names.forEach(name=>{
            header.push(name);
        });

        const body=[];
        const logic=new Logic(this.names.length);
        
        this.names.forEach(horizontalName=>{
            const row=[];
            row.push(horizontalName);
            this.names.forEach(verticalName=>{
                row.push(logic.decide(this.names.indexOf(horizontalName),
                                    this.names.indexOf(verticalName)));
            });
            body.push(row);
        });
        const table=new WordTable(header, body);
        console.log(table.string());
    }
}