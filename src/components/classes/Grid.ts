import p5Types from "p5";
import {CELL_TYPE, Cell} from './Cell';
import Constants, {Colors} from '../../tools/Constants';
import type { Vector } from '../../tools/Constants';
import Agent from './Agent';

export default class Grid {

    rows: number;
    cols: number;
    grid: Cell[][];
    population: Agent[];
    populationDeathToll: number;
    width: number;
    height: number;
    cell_height: number;
    cell_width: number;
    mutationRate: number;
    solved: boolean;

    constructor(rows: number, cols: number, width: number, height: number, population: number) {
        this.solved = false;
        this.populationDeathToll = 0;
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.height = height;
        this.cell_width = this.width / this.cols;
        this.cell_height = this.height / this.rows;
        this.mutationRate = Constants.DEFAULT_MUTATION;
        this.grid = this.createGrid(this.rows, this.cols);
        this.generateMaze();
        this.population = this.createPopulation(population); // TODO: make this population size a slider value
    }

    // Creates a new, empty grid (2d array of `Cells`) and returns it
    createGrid(rows: number, cols: number) {
        let grid: Cell[][] = [];
        for(let y = 0; y < this.rows; y++) {
            grid.push([]);
            for(let x = 0; x < this.cols; x++) {
                grid[y].push(new Cell(x, y, CELL_TYPE.wall));
            }
        }
        return grid;
    }

    show(p5: p5Types) {
        // Draw the grid of cells
        p5.push();
        for(let y = 0; y < this.grid.length; y++) {
            for(let x = 0; x < this.grid[y].length; x++) {
                switch(this.grid[y][x].type) {
                    case CELL_TYPE.empty: {
                        continue; // empty cells do not need to be rendered
                    }
                    case CELL_TYPE.wall: {
                        p5.stroke(Colors.PRIMARY);
                        p5.fill(Colors.PRIMARY);
                        break;
                    }
                    case CELL_TYPE.start_node: {
                        p5.fill(0, 255, 0);
                        break;
                    }
                    case CELL_TYPE.end_node: {
                        p5.fill(255, 0, 0);
                        break;
                    }
                }
                p5.rect(x * this.cell_width, y * this.cell_height,
                    this.cell_width, this.cell_height);
            }
        }
        p5.pop();

        // Draw the agents
        p5.push();
        p5.noStroke();
        let radius = Math.min(this.cell_width / 8, this.cell_height / 8); // TODO: see if 8 is the best factor here
        for(let agent of this.population) {
            let parent_fitness_avg = (agent.parent_a_fitness + agent.parent_b_fitness) / 2;
            p5.fill(255 * (1 - parent_fitness_avg), 255 * parent_fitness_avg, 0);
            p5.ellipse(agent.pos.x, agent.pos.y, radius);
        }
        p5.pop();
    }

    update(p5: p5Types) {

        // get the end node position
        let epos = this.getEndNodePosition();
        let ex = epos.x * this.cell_width + this.cell_width / 2;
        let ey = epos.y * this.cell_height + this.cell_height / 2;

        // All agents in the current population have died
        if(this.populationDeathToll >= this.population.length) { // TODO: use variable for population size

            // TODO: remove this at some point
            p5.push();
            p5.fill('blue');
            p5.ellipse(ex, ey, 15);
            p5.pop();

            // calculate fitness for each agent
            let max_fitness = -1;
            let mx = -1;
            let my = -1;
            for(let agent of this.population) {

                // calculate and set the distance each agent is to the end node
                agent.setDistance(Math.sqrt(Math.abs(agent.pos.x - ex) + Math.abs(agent.pos.y - ey)));

                // calculate fitness of current agent
                let last_pos = agent.getLastPosition();
                let last_cell = this.getCell(last_pos);
                agent.calculateFitness(last_cell.getDampening());

                // keep track of the max fitness (used for normalization)
                if(agent.fitness > max_fitness) {
                    max_fitness = agent.fitness;
                    mx = agent.pos.x;
                    my = agent.pos.y;
                }
            }

            // TODO: remove this at some point
            p5.push();
            p5.fill('red');
            p5.ellipse(mx, my, 15);
            p5.pop();

            // Create the mating pool
            let pool: Agent[] = [];

            // Add higher fitness agents to the mating pool more often than lower fitness agents
            for(let agent of this.population) {
                //normalize fitness value between 0-1
                agent.fitness /= max_fitness;
                let n = agent.fitness * 100;
                for(let i = 0; i < n; i++) pool.push(agent);
            }

            this.population = this.createPopulationFromPool(this.population.length, pool);
        }

        // Update each of the agents
        for(let agent of this.population) {

            if (this.getCell(agent.pos).type === CELL_TYPE.end_node) { this.solved = true; }

            // If the agent is already dead, skip it
            if(agent.isDead()) continue;

            // get the agent's current cell in the grid
            let cell = this.getCell(agent.pos);

            // Agent found the target
            if(cell.type === CELL_TYPE.end_node) {
                agent.foundTarget();
                agent.kill(); // set the agent's 'dead' value to true
                this.populationDeathToll++;
                continue;
            }

            // Agent either hit a wall or is outside the bounds of the canvas
            if (!agent.inBounds(p5) || this.getCell(agent.pos).type === CELL_TYPE.wall) {
                agent.kill(); // set the agent's 'dead' value to true
                let last_pos = agent.getLastPosition();
                let last_cell = this.getCell(last_pos);
                this.grid[last_cell.y][last_cell.x].dampen();
                this.populationDeathToll++;
                continue;
            }

            // update the visited cells of the agent
            agent.updateVisitedCells(this.getCell(agent.pos));

            // Set the agents last position as the current position
            agent.setLastPosition(agent.pos.x, agent.pos.y);

            // If the agent is not dead, update it
            agent.update();
        }
    }

    handleMouse(p5: p5Types) {

        // Check if mouse is pressed
        if(!p5.mouseIsPressed) return;

        // Get mouse location in the grid
        let cx = Math.floor(p5.mouseX / this.cell_width);
        let cy = Math.floor(p5.mouseY / this.cell_height);

        // Check that the mouse is within the grid (not the banner or scroll bar, etc.)
        if(cx < 1 || cx > this.cols - 2 || cy < 1 || cy > this.rows - 2) return;

        // Check that only the empty or wall nodes are being redrawn
        if(this.grid[cy][cx].type !== CELL_TYPE.empty && this.grid[cy][cx].type !== CELL_TYPE.wall) return;

        // The maze is no longer solved because it was updated
        this.solved = false;

        // Reset dampening of cells if the maze is altered
        for(let row of this.grid)
            for(let cell of row) cell.resetDampening();

        // Shift-click draws empty cells
        if(p5.keyIsPressed && p5.keyCode == p5.SHIFT)
            this.grid[cy][cx].type = CELL_TYPE.empty;

        // Regular click draws walls
        else
            this.grid[cy][cx].type = CELL_TYPE.wall;
    }

    updateCells(height: number, width: number) {
        this.width = height;
        this.height = width;
        this.cell_width = this.width / this.cols;
        this.cell_height = this.height / this.rows;
        this.solved = false;
    }

    /**
     * Make a new class to regenerate the grid and population
     */
    generateNewMaze(rows: number, cols: number, population: number) {
        let newGrid = new Grid(rows, cols, this.width, this.height, population);
        return newGrid;
    }

    // Automatically generates a maze using randomized depth-first search iterative algorithm (https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation)
    generateMaze() {
        // Choose the initial cell, mark it as visited and push it to the stack
        let current: Cell = this.grid[1][1];
        current.visited = true;
        let stack: Cell[] = [current];

        // Mark the current cell as the start node
        current.type = CELL_TYPE.start_node;

        // While the stack is not empty
        while(stack.length > 0) {
            // Pop a cell from the stack and make it a current cell
            current = stack.pop()!;

            // Get the unvisited neighbors of the current cell
            let neighbors: Cell[] = [];
            if(current.y >= 2 && !this.grid[current.y - 2][current.x].visited)             neighbors.push(this.grid[current.y - 2][current.x]);
            if(current.x >= 2 && !this.grid[current.y][current.x - 2].visited)             neighbors.push(this.grid[current.y][current.x - 2]);
            if(current.y <= this.rows - 3 && !this.grid[current.y + 2][current.x].visited) neighbors.push(this.grid[current.y + 2][current.x]);
            if(current.x <= this.cols - 3 && !this.grid[current.y][current.x + 2].visited) neighbors.push(this.grid[current.y][current.x + 2]);

            // Make neighbors part of the maze
            for(let neighbor of neighbors) neighbor.type = CELL_TYPE.empty;

            // If the current cell has any neighbours which have not been visited
            if(neighbors.length > 0) {

                // Push the current cell to the stack
                stack.push(current);

                // Choose one of the unvisited neighbours
                let chosen = neighbors[Math.floor(Math.random() * neighbors.length)];

                // Remove the wall between the current cell and the chosen cell
                if(chosen.y < current.y) this.grid[current.y - 1][current.x].type      = CELL_TYPE.empty;
                else if(chosen.y > current.y) this.grid[current.y + 1][current.x].type = CELL_TYPE.empty;
                else if(chosen.x < current.x) this.grid[current.y][current.x - 1].type = CELL_TYPE.empty;
                else if(chosen.x > current.x) this.grid[current.y][current.x + 1].type = CELL_TYPE.empty;

                // Mark the chosen cell as visited and push it to the stack
                chosen.visited = true;
                stack.push(chosen);
            }
        }

        // Set the end node position
        this.grid[this.rows - 2][this.cols - 2].type = CELL_TYPE.end_node;
    }

    // Creates and returns a new population of size `n`
    createPopulation(n: number) {
        let population: Agent[] = [];
        let start_node_pos = this.getStartNodePosition();
        for(let i = 0; i < n; i++) {
            population.push(
                new Agent(start_node_pos.x * this.cell_width + this.cell_width / 2,
                    start_node_pos.y * this.cell_height + this.cell_height / 2)
            ); // TODO: agents should start at the start node (new Agent(start_node.x, start_node.y))
        }
        this.populationDeathToll = 0; // reset the death toll of the current population
        return population;
    }

    // Create a population using the parents from the selection pool
    createPopulationFromPool(n: number, pool: Agent[]) {
        let population: Agent[] = [];
        let start_node_pos = this.getStartNodePosition();

        while(population.length < n) {
            let parent_a = pool[Math.floor(Math.random() * pool.length)];
            let parent_b = pool[Math.floor(Math.random() * pool.length)];
            let min_dna_length = Math.min(parent_a.dna.length, parent_b.dna.length);
            let mid = min_dna_length / 2;
            let child_dna: Vector[] = [];

            for(let i = 0; i < min_dna_length; i++) {
                if(Math.random() < this.mutationRate) child_dna.push({x: Math.random() * (Constants.ACC_RANGE[1] - Constants.ACC_RANGE[0]) + Constants.ACC_RANGE[0], y: Math.random() * (Constants.ACC_RANGE[1] - Constants.ACC_RANGE[0]) + Constants.ACC_RANGE[0]}); // TODO: implement mutation rate slider AND create a vector library
                else if(i < mid) child_dna.push(parent_a.dna[i]);
                else child_dna.push(parent_b.dna[i]);
            }

            population.push(new Agent(start_node_pos.x * this.cell_width + this.cell_width / 2,
                                      start_node_pos.y * this.cell_height + this.cell_height / 2, child_dna, parent_a.fitness, parent_b.fitness));
        }

        this.populationDeathToll = 0;
        return population;
    }

    // Returns a position object that represents the cell location of the start node in the grid {x: start node x position, y: start node y position}
    getStartNodePosition() {
        for(let y = 0; y < this.grid.length; y++) {
            for(let x = 0; x < this.grid[y].length; x++) {
                if(this.grid[y][x].type === CELL_TYPE.start_node) {
                    return {x: x, y: y};
                }
            }
        }
        return {x: -1, y: -1};
    }

    // Returns a position object that represents the cell location of the end node in the grid {x: end node x position, y: end node y position}
    getEndNodePosition() {
        for(let y = 0; y < this.grid.length; y++) {
            for(let x = 0; x < this.grid[y].length; x++) {
                if(this.grid[y][x].type === CELL_TYPE.end_node) {
                    return {x: x, y: y};
                }
            }
        }
        return {x: -1, y: -1};
    }

    getCell(pos: Vector) {
        let cell_y = Math.floor(pos.y/this.cell_height);
        let cell_x = Math.floor(pos.x/this.cell_width);
        return this.grid[cell_y][cell_x];
    }

    setMutationRate(mutation: number) {
        this.mutationRate = mutation;
    }

    isSolved() {
        return this.solved;
    }
}
