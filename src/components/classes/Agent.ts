import {Direction} from '../../tools/Constants';

export default class Agent {

    dna: Direction[];
    x: number;
    y: number;
    age: number;
    
    constructor(x: number, y:number, dna?: Direction[]) {
        this.x = x;
        this.y = y;
        this.dna = dna ?? [];
        this.age = 0;
    }

    update() {

        // Ran out of DNA from parents, generate new random DNA
        while(this.age > this.dna.length - 1) {
            let dirs = [Direction.NORTH, Direction.SOUTH, Direction.EAST, Direction.WEST];
            this.dna.push(dirs[Math.floor(Math.random() * dirs.length)]);
        }

        // Direction is determined by dna (value) and age (index)
        let dir: Direction = this.dna[this.age];

        switch(dir) {
            case Direction.NORTH: {
                this.y++;
                break;
            }
            case Direction.SOUTH: {
                this.y--;
                break;
            }
            case Direction.EAST: {
                this.x++;
                break;
            }
            case Direction.WEST: {
                this.x--;
                break;
            }
        }

        // Increment the age of the agent
        this.age++;
    }
}
