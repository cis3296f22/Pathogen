import { Direction } from '../../tools/Constants';
import p5Types from 'p5';

export default class Agent {

    dna: Direction[];
    x: number;
    y: number;
    age: number;
    dead: boolean;
    
    constructor(x: number, y:number, dna?: Direction[]) {
        this.x = x;
        this.y = y;
        this.dna = dna ?? [];
        this.age = 0;
        this.dead = false;
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

    // Returns a boolean whether or not the agent is in the bounds of the canvas
    inBounds(p5: p5Types) {
        return this.x >= 0 && this.x <= p5.width && this.y >= 0 && this.y <= p5.height;
    }

    // Sets the 'dead' class variable of the `Agent` (this) class to true
    kill() {
        this.dead = true;
    }

    // Returns true if the agent is dead, false if the agent is not dead
    isDead() {
        return this.dead;
    }

    // Calculates the fitness of the agent and sets the 'fitness' class variable
    calculateFitness() {
        // TODO: implement fitness function
        return;
    }
}
