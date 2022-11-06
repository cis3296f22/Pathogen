import Constants from  '../../tools/Constants';
import type { Vector } from '../../tools/Constants';
import p5Types from 'p5';

export default class Agent {

    dna: Vector[];
    pos: Vector;
    vel: Vector;
    acc: Vector;
    age: number;
    dead: boolean;
    dist: number;
    fitness: number;

    constructor(x: number, y:number, dna?: Vector[]) {
        this.pos = {x: x, y: y};
        this.vel = {x: 0, y: 0};
        this.acc = {x: 0, y: 0};
        this.dna = dna ?? [];
        this.age = 0;
        this.dead = false;
        this.dist = Number.MAX_SAFE_INTEGER;
        this.fitness = 0;
    }

    update(cell_width: number, cell_height: number) {

        // Ran out of DNA from parents, generate new random DNA
        while(this.age > this.dna.length - 1) {
            this.dna.push({x: Math.random() * (Constants.ACC_MAX - Constants.ACC_MIN) + Constants.ACC_MIN, y: Math.random() * (Constants.ACC_MAX - Constants.ACC_MIN) + Constants.ACC_MIN});
        }

        // Direction is determined by dna (value) and age (index)
        this.acc = this.dna[this.age];
        this.vel.x += this.acc.x
        this.vel.y += this.acc.y;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        // Increment the age of the agent
        this.age++;
    }

    // Returns a boolean whether or not the agent is in the bounds of the canvas
    inBounds(p5: p5Types) {
        return this.pos.x >= 0 && this.pos.x <= p5.width && this.pos.y >= 0 && this.pos.y <= p5.height;
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
        let fitness = 1 / Math.pow(2, this.dist); // TODO: implement less naive fitness function
        this.fitness = fitness;
    }

    // Sets the distance of the current agent to `n`
    setDistance(n: number) {
        this.dist = n;
    }
}
