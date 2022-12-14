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
    generationCount: number;
    solved: boolean;
    start_node_moving: boolean;
    end_node_moving: boolean;

    constructor(rows: number, cols: number, width: number, height: number, population: number) {
        this.solved = false;
        this.populationDeathToll = 0;
        this.rows = rows;
        this.cols = cols;
        this.start_node_moving = false;
        this.end_node_moving = false;
        this.width = width;
        this.height = height;
        this.cell_width = this.width / this.cols;
        this.cell_height = this.height / this.rows;
        this.mutationRate = Constants.DEFAULT_MUTATION;
        this.generationCount = 1;
        this.grid = this.createGrid(this.rows, this.cols);
        this.generateMaze();
        this.population = this.createPopulation(population); // TODO: make this population size a slider value
    }
    /**
     * Creates a new, empty grid (2d array of `Cells`) and returns it
     */
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
        /**
         * Draw the grid of cells
         */
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
                        p5.noStroke();
                        p5.fill(0, 255, 0);
                        break;
                    }
                    case CELL_TYPE.end_node: {
                        p5.noStroke();
                        p5.fill(255, 0, 0);
                        break;
                    }
                }
                p5.rect(x * this.cell_width, y * this.cell_height,
                    this.cell_width, this.cell_height);
            }
        }
        p5.pop();
        /**
         * Draw the agents
         */
        p5.push();
        let radius = Math.min(this.cell_width / 8, this.cell_height / 8);
        for(let agent of this.population) {
            p5.stroke(agent.outline);
            p5.fill(agent.color);
            p5.ellipse(agent.pos.x, agent.pos.y, radius);
        }
        p5.pop();
    }

    update(p5: p5Types) {
        /**
         * get the end node position
         */
        let epos = this.getEndNodePosition();
        let ex = epos.x * this.cell_width + this.cell_width / 2;
        let ey = epos.y * this.cell_height + this.cell_height / 2;
        /**
         * All agents in the current population have died
         */
        if(this.populationDeathToll >= this.population.length) {
            /**
             * calculate fitness for each agent
             */
            let max_fitness = -1;
            /**
             * let mx = -1;
             * let my = -1;
             */
            for(let agent of this.population) {
                /**
                 * calculate and set the distance each agent is to the end node
                 */
                agent.setDistance(Math.sqrt(Math.abs(agent.pos.x - ex) + Math.abs(agent.pos.y - ey)));
                /**
                 * calculate fitness of current agent
                 */
                let last_pos = agent.getLastPosition();
                let last_cell = this.getCell(last_pos);
                agent.calculateFitness(last_cell.getDampening());
                /**
                 * keep track of the max fitness (used for normalization)
                 */
                if(agent.fitness > max_fitness) {
                    max_fitness = agent.fitness;
                    /**
                     * mx = agent.pos.x;
                     * my = agent.pos.y;
                     */
                }
            }
            /**
             * Create the mating pool
             */
            let pool: Agent[] = [];
            /**
             * Add higher fitness agents to the mating pool more often than lower fitness agents
             */
            for(let agent of this.population) {
                /**
                 * Normalize fitness value between 0-1
                 */
                agent.fitness /= max_fitness;
                let n = agent.fitness * 100;
                for(let i = 0; i < n; i++) pool.push(agent);
            }

            this.population = this.createPopulationFromPool(this.population.length, pool);
        }
        /**
         * Update each of the agents
         */
        for(let agent of this.population) {

            if (this.getCell(agent.pos).type === CELL_TYPE.end_node) { this.solved = true; }
            /**
             * If the agent is already dead, skip it
             */
            if(agent.isDead()) continue;
            /**
             * Get the agent's current cell in the grid
             */
            let cell = this.getCell(agent.pos);
            /**
             * Agent found the target
             */
            if(cell.type === CELL_TYPE.end_node) {
                agent.foundTarget();
                agent.kill(); // set the agent's 'dead' value to true
                this.populationDeathToll++;
                continue;
            }
            /**
             * Agent either hit a wall or is outside the bounds of the canvas
             */
            if (!agent.inBounds(p5) || this.getCell(agent.pos).type === CELL_TYPE.wall) {
                agent.kill(); // set the agent's 'dead' value to true
                let last_pos = agent.getLastPosition();
                let last_cell = this.getCell(last_pos);
                this.grid[last_cell.y][last_cell.x].dampen();
                this.populationDeathToll++;
                continue;
            }
            /**
             * Update the visited cells of the agent
             */
            agent.updateVisitedCells(this.getCell(agent.pos));
            /**
             * Set the agents last position as the current position
             */
            agent.setLastPosition(agent.pos.x, agent.pos.y);
            /**
             * If the agent is not dead, update it
             */
            let ppos = this.getCell(agent.pos);
            agent.update();
            /**
             * Check if the agent went through a diagonal (not allowed)
             */
            let pos = this.getCell(agent.pos);
            if(Math.abs(ppos.x - pos.x) + Math.abs(ppos.y - pos.y) > 1) {
                agent.kill();
                this.populationDeathToll++;
            }
        }
    }

    handleMouse(p5: p5Types) {
        /**
         * Reset cursor to default
         */
        p5.cursor('default');
        /**
         * Get mouse location in the grid
         */
        let cx = Math.floor(p5.mouseX / this.cell_width);
        let cy = Math.floor(p5.mouseY / this.cell_height);
        /**
         * If cursor is off canvas, reset moving status of start and end nodes
         */
        if(cx < 0 || cx > this.cols - 1 || cy < 0 || cy > this.rows - 1) {
            this.start_node_moving = false;
            this.end_node_moving = false;
        }

        // Check that the mouse is within the grid (not the banner or scroll bar, etc.)
        if(!this.start_node_moving && !this.end_node_moving && (cx < 1 || cx > this.cols - 2 || cy < 1 || cy > this.rows - 2)) return;
        /**
         * Constrain the position to the grid (not including border walls)
         */
        cx = p5.constrain(cx, 1, this.cols - 2);
        cy = p5.constrain(cy, 1, this.rows - 2)
        /**
         * Change cursor style
         */
        if(this.start_node_moving || this.end_node_moving) {
            p5.cursor('grabbing');
        } else if(this.grid[cy][cx].type === CELL_TYPE.start_node || this.grid[cy][cx].type === CELL_TYPE.end_node) {
            p5.cursor('grab');
        }
        /**
         * Hover effect for moving start node
         */
        if(this.start_node_moving && this.grid[cy][cx].type !== CELL_TYPE.start_node && this.grid[cy][cx].type !== CELL_TYPE.end_node) {
            p5.push();
            p5.noStroke();
            p5.fill(0, 255, 0, 64);
            p5.rect(cx * this.cell_width, cy * this.cell_height, this.cell_width, this.cell_height);
            p5.pop();
            return;
        }
        /**
         * Hover effect for moving end node
         */
        if(this.end_node_moving && this.grid[cy][cx].type !== CELL_TYPE.end_node && this.grid[cy][cx].type !== CELL_TYPE.start_node) {
            p5.push();
            p5.fill(255, 0, 0, 64);
            p5.noStroke();
            p5.rect(cx * this.cell_width, cy * this.cell_height, this.cell_width, this.cell_height);
            p5.pop();
            return;
        }
        /**
         * Check that only the empty or wall nodes are being redrawn
         */
        if(this.grid[cy][cx].type !== CELL_TYPE.empty && this.grid[cy][cx].type !== CELL_TYPE.wall) return;
        /**
         * Hover effect over cells
         */
        p5.push();
        switch(this.grid[cy][cx].type) {
            case CELL_TYPE.empty: {
                p5.fill(Colors.SECONDARY_RGB[0] * 1.5, Colors.SECONDARY_RGB[1] * 1.5, Colors.SECONDARY_RGB[2] * 1.5, 100);
                break;
            }
            case CELL_TYPE.wall: {
                p5.fill(Colors.PRIMARY_RGB[0] * 1.5, Colors.PRIMARY_RGB[1] * 1.5, Colors.PRIMARY_RGB[2] * 1.5, 100);
                break;
            }
        }
        p5.noStroke();
        p5.rect(cx * this.cell_width, cy * this.cell_height, this.cell_width, this.cell_height);
        p5.pop();
        /** 
         * Check if mouse is pressed
         */
        if(!p5.mouseIsPressed) return;
        /**
         * The maze is no longer solved because it was updated
         */
        this.solved = false;
        /**
         * Reset dampening of cells if the maze is altered
         */
        for(let row of this.grid)
            for(let cell of row) cell.resetDampening();
        /**
         * Shift-click draws empty cells
         */
        if(p5.keyIsPressed && p5.keyCode === p5.SHIFT)
            this.grid[cy][cx].type = CELL_TYPE.empty;
        /** 
         * Regular click draws walls
         */
        else
            this.grid[cy][cx].type = CELL_TYPE.wall;
    }

    updateCells(height: number, width: number) {
        this.width = height;
        this.height = width;
        this.solved = false;
        let prev_cell_width = this.cell_width;
        let prev_cell_height = this.cell_height;
        this.cell_width = this.width / this.cols;
        this.cell_height = this.height / this.rows;
        for(let agent of this.population) {
            agent.pos.x *= this.cell_width / prev_cell_width;
            agent.pos.y *= this.cell_height / prev_cell_height;
        }
    }

    /**
     * Make a new class to regenerate the grid and population
     */
    generateNewMaze(rows: number, cols: number, population?: number) {
        let newGrid = new Grid(rows, cols, this.width, this.height, population ?? this.population.length);
        return newGrid;
    }
    /**
     * Automatically generates a maze using randomized depth-first search iterative algorithm (https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation)
     */
    generateMaze() {
        /**
         * Choose the initial cell, mark it as visited and push it to the stack
         */
        let current: Cell = this.grid[1][1];
        current.visited = true;
        let stack: Cell[] = [current];
        /**
         * Mark the current cell as the start node
         */
        current.type = CELL_TYPE.start_node;
        /**
         * While the stack is not empty
         */
        while(stack.length > 0) {
            /**
             * Pop a cell from the stack and make it a current cell
             */
            current = stack.pop()!;
            /**
             * Get the unvisited neighbors of the current cell
             */
            let neighbors: Cell[] = [];
            if(current.y >= 2 && !this.grid[current.y - 2][current.x].visited)             neighbors.push(this.grid[current.y - 2][current.x]);
            if(current.x >= 2 && !this.grid[current.y][current.x - 2].visited)             neighbors.push(this.grid[current.y][current.x - 2]);
            if(current.y <= this.rows - 3 && !this.grid[current.y + 2][current.x].visited) neighbors.push(this.grid[current.y + 2][current.x]);
            if(current.x <= this.cols - 3 && !this.grid[current.y][current.x + 2].visited) neighbors.push(this.grid[current.y][current.x + 2]);
            /**
             * Make neighbors part of the maze
             */
            for(let neighbor of neighbors) neighbor.type = CELL_TYPE.empty;
            /**
             * If the current cell has any neighbours which have not been visited
             */
            if(neighbors.length > 0) {
                /**
                 * Push the current cell to the stack
                 */
                stack.push(current);
                /**
                 * Choose one of the unvisited neighbours
                 */
                let chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
                /**
                 * Remove the wall between the current cell and the chosen cell
                 */
                if(chosen.y < current.y) this.grid[current.y - 1][current.x].type      = CELL_TYPE.empty;
                else if(chosen.y > current.y) this.grid[current.y + 1][current.x].type = CELL_TYPE.empty;
                else if(chosen.x < current.x) this.grid[current.y][current.x - 1].type = CELL_TYPE.empty;
                else if(chosen.x > current.x) this.grid[current.y][current.x + 1].type = CELL_TYPE.empty;
                /**
                 * Mark the chosen cell as visited and push it to the stack
                 */
                chosen.visited = true;
                stack.push(chosen);
            }
        }
        /**
         * Set the end node position
         */
        this.grid[this.rows - 2][this.cols - 2].type = CELL_TYPE.end_node;
    }
    /**
     * Creates and returns a new population of size `n`
     */
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
    /**
     * Create a population using the parents from the selection pool
     */
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

            let parent_avg_fitness = (parent_a.fitness + parent_b.fitness) / 2;
            let child_color = [255 * (1 - parent_avg_fitness), 255 * parent_avg_fitness, 0];
            population.push(new Agent(start_node_pos.x * this.cell_width + this.cell_width / 2,
                                      start_node_pos.y * this.cell_height + this.cell_height / 2, child_dna, child_color));
        }
        this.generationCount += 1;
        this.populationDeathToll = 0;
        return population;
    }
    /**
     * Returns a position object that represents the cell location of the start node in the grid {x: start node x position, y: start node y position}
     */
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
    /**
     * Returns a position object that represents the cell location of the end node in the grid {x: end node x position, y: end node y position}
     */
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
        let cell = this.grid[cell_y] ? this.grid[cell_y][cell_x] : this.grid[0][0];
        if (cell === undefined) return this.grid[0][0];
        return cell;
    }

    setMutationRate(mutation: number) {
        this.mutationRate = mutation;
    }

    isSolved() {
        return this.solved;
    }

    handleMousePressed(p5: p5Types) {
        /**
         * Get mouse location in the grid
         */
        let cx = Math.floor(p5.mouseX / this.cell_width);
        let cy = Math.floor(p5.mouseY / this.cell_height);
        /**
         * Check that the mouse is within the grid (not the banner or scroll bar, etc.)
         */
        if(cx < 1 || cx > this.cols - 2 || cy < 1 || cy > this.rows - 2) return;
        /**
         * Check if the mouse is clicked in the start node position
         */
        if(this.grid[cy][cx].type === CELL_TYPE.start_node) {
            this.start_node_moving = true;
            return;
        }
        /**
         * Check if the mouse is clicked in the end node position
         */
        if(this.grid[cy][cx].type === CELL_TYPE.end_node) {
            this.end_node_moving = true;
            return;
        }
    }

    handleMouseReleased(p5: p5Types) {
        /**
         * Get mouse location in the grid
         */
        let cx = Math.floor(p5.mouseX / this.cell_width);
        let cy = Math.floor(p5.mouseY / this.cell_height);
        /**
         * Contrain the position to the grid (not including border walls)
         */
        cx = p5.constrain(cx, 1, this.cols - 2);
        cy = p5.constrain(cy, 1, this.rows - 2)
        /**
         * Start node dropped on end node (not allowed)
         */
        if(this.start_node_moving && this.grid[cy][cx].type === CELL_TYPE.end_node) {
            this.start_node_moving = false;
            return;
        }
        /**
         * End node dropped on start node (not allowed)
         */
        if(this.end_node_moving && this.grid[cy][cx].type === CELL_TYPE.start_node) {
            this.end_node_moving = false;
            return;
        }
        /**
         * Drop the start node
         */
        if(this.start_node_moving && !(this.grid[cy][cx].type === CELL_TYPE.end_node)) {
            let start_pos = this.getStartNodePosition();
            this.grid[start_pos.y][start_pos.x].type = CELL_TYPE.empty;
            this.grid[cy][cx].type = CELL_TYPE.start_node;
            this.start_node_moving = false;
            return;
        }
        /**
         * Drop the end node
         */
        if(this.end_node_moving && !(this.grid[cy][cx].type === CELL_TYPE.start_node)) {
            let end_pos = this.getEndNodePosition();
            this.grid[end_pos.y][end_pos.x].type = CELL_TYPE.empty;
            this.grid[cy][cx].type = CELL_TYPE.end_node;
            this.end_node_moving = false;
            return;
        }
    }
    setPopulation(pop: number) { this.population = this.createPopulation(pop); }
    getGenerationCount() { return this.generationCount; }
}
