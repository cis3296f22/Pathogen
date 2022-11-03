import {Direction} from '../../tools/Constants';

export default class Agent {

    dna: Direction[];
    
    constructor(x: number, y:number, dna?: Direction[]) {
        this.dna = dna ?? [];
    }
}
