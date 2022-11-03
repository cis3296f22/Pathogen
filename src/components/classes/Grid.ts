import p5Types from "p5";
import {CELL_TYPE, Cell} from './Cell';
import {Colors} from '../../tools/Constants';
import Agent from './Agent';

export default class Grid {

    rows: number;
    cols: number;
    grid: Cell[][];
    population: Agent[];
    width: number;
    height: number;
    cell_height: number;
    cell_width: number;

    constructor(rows: number, cols: number, width: number, height: number) {
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.height = height;
        this.grid = this.createGrid(this.rows, this.cols);
        this.cell_width = this.width / this.cols;
        this.cell_height = this.height / this.rows;
        
        this.generateMaze();
        this.population = this.createPopulation(100); // TODO: make this population size a slider value
        console.log(this.population); // TODO: remove this
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
        for(let agent of this.population) {
            p5.ellipse(agent.x, agent.y, 5);
        }
        p5.pop();
    }

    update(p5: p5Types) {

        // Update each of the agents
        for(let agent of this.population) {
            if (this.getCell(agent.x, agent.y).type !== CELL_TYPE.wall) {
                agent.update();
            }
        }
    }

    /**
     * Make a new class to regenerate the grid and population
     */
    generateNewMaze(rows: number, cols: number) {
        let newGrid = new Grid(rows, cols, this.width, this.height);
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

    getCell(x: number, y: number) {
        let cell_y = Math.floor(y/this.cell_height);
        let cell_x = Math.floor(x/this.cell_width);
        return this.grid[cell_y][cell_x];
    }
}
