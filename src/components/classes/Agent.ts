import { Direction } from '../../tools/Constants';
import p5Types from 'p5';

export default class Agent {

    dna: Direction[];
    x: number;
    y: number;
    age: number;
    dead: boolean;
    dist: number;
    fitness: number;
    visited_cells: any;

    constructor(x: number, y:number, dna?: Direction[]) {
        this.x = x;
        this.y = y;
        this.dna = dna ?? [];
        this.age = 0;
        this.dead = false;
        this.dist = Number.MAX_SAFE_INTEGER;
        this.fitness = 0;
        this.visited_cells = [];
    }

    update(cell_width: number, cell_height: number) {

        // Ran out of DNA from parents, generate new random DNA
        while(this.age > this.dna.length - 1) {
            let dirs = [Direction.NORTH, Direction.SOUTH, Direction.EAST, Direction.WEST];
            this.dna.push(dirs[Math.floor(Math.random() * dirs.length)]);
        }

        // Direction is determined by dna (value) and age (index)
        let dir: Direction = this.dna[this.age];

        switch(dir) {
            case Direction.NORTH: {
                this.y += 1;
                break;
            }
            case Direction.SOUTH: {
                this.y -= 1;
                break;
            }
            case Direction.EAST: {
                this.x += 1;
                break;
            }
            case Direction.WEST: {
                this.x -= 1;
                break;
            }
        }

        // Add the current cell to list of visited cells (if not already present in the array)
        let cx = Math.floor(this.x / cell_width);
        let cy = Math.floor(this.y / cell_height);
        let visited = false;
        for(let cell of this.visited_cells) {
            if(cell.x == cx && cell.y == cy) {
                visited = true;
                break;
            }
        }
        if(!visited) this.visited_cells.push({x: cx, y: cy});

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
        let fitness = 1 / this.dist * Math.pow(3, this.visited_cells.length); // TODO: implement less naive fitness function
        this.fitness = fitness;
    }

    // Sets the distance of the current agent to `n`
    setDistance(n: number) {
        this.dist = n;
    }
}
