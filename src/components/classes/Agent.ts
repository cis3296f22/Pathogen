import Constants from  '../../tools/Constants';
import type { Vector } from '../../tools/Constants';
import p5Types from 'p5';
import { Cell } from './Cell';

export default class Agent {

    dna: Vector[];
    pos: Vector;
    vel: Vector;
    acc: Vector;
    age: number;
    dead: boolean;
    found_target: boolean;
    dist: number;
    fitness: number;
    visited_cells: Cell[];
    last_pos: Vector;
    color: number[];
    outline: number[];

    constructor(x: number, y:number, dna?: Vector[], color?: number[]) {
        this.pos = {x: x, y: y};
        this.vel = {x: 0, y: 0};
        this.acc = {x: 0, y: 0};
        this.dna = dna ?? [];
        this.age = 0;
        this.dead = false;
        this.color = color ?? [255, 0, 0];
        this.outline = [this.color[0] * 0.5, this.color[1] * 0.5, this.color[2] * 0.5];
        this.found_target = false;
        this.dist = Number.MAX_SAFE_INTEGER;
        this.fitness = 0;
        this.visited_cells = [];
        this.last_pos = {x: -1, y: -1};
    }

    update() {
        /**
         * Ran out of DNA from parents, generate new random DNA
         */
        while(this.age > this.dna.length - 1) {
            this.dna.push({x: Math.random() * (Constants.ACC_RANGE[1] - Constants.ACC_RANGE[0]) + Constants.ACC_RANGE[0], y: Math.random() * (Constants.ACC_RANGE[1] - Constants.ACC_RANGE[0]) + Constants.ACC_RANGE[0]});
        }
        /**
         * Direction is determined by dna (value) and age (index)
         */
        this.acc = this.dna[this.age];
        this.vel.x += this.acc.x
        this.vel.y += this.acc.y;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        /**
         * Increment the age of the agent
         */
        this.age++;
    }
    /**
     * Returns a boolean whether or not the agent is in the bounds of the canvas
     */
    inBounds(p5: p5Types) {
        return this.pos.x >= 0 && this.pos.x <= p5.width && this.pos.y >= 0 && this.pos.y <= p5.height;
    }
    /**
     * Sets the 'dead' class variable of the `Agent` (this) class to true
     */
    kill() {
        this.dead = true;
    }
    /**
     * Returns true if the agent is dead, false if the agent is not dead
     */
    isDead() {
        return this.dead;
    }
    /**
     * Calculates the fitness of the agent and sets the 'fitness' class variable
     */
    calculateFitness(dampening: number) {
        let fitness = this.visited_cells.length / (this.dist * dampening);
        fitness = Math.min(fitness, Number.MAX_SAFE_INTEGER);
        if(this.found_target) fitness = Number.MAX_SAFE_INTEGER;
        this.fitness = fitness;
    }
    /**
     * Updates this agent's visited cells array if the cell provided is not yet in the array
     */
    updateVisitedCells(cell: Cell) {
        for(let visited_cell of this.visited_cells) {
            if(cell.x === visited_cell.x && cell.y === visited_cell.y) return;
        }
        this.visited_cells.push(cell);
    }
    /**
     * Sets the distance of the current agent to `n`
     */
    setDistance(n: number) {
        this.dist = n;
    }
    /**
     * Returns the last position of the agent
     */
    getLastPosition() {
        return this.last_pos;
    }
    /**
     * Sets the last position of the agent
     */
    setLastPosition(x: number, y: number) {
        this.last_pos.x = x;
        this.last_pos.y = y;
    }
    /**
     * Sets the agents found target value to true
     */
    foundTarget() {
        this.found_target = true;
    }
}
