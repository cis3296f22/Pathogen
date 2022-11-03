import {Direction} from '../../tools/Constants';

export default class Agent {

    dna: Direction[];
    x: number;
    y: number;
    
    constructor(x: number, y:number, dna?: Direction[]) {
        this.x = x;
        this.y = y;
        this.dna = dna ?? [];
    }
}
