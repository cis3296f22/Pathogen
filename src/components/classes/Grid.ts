import p5Types from "p5";
import {CELL_TYPE, Cell} from './Cell';

export default class Grid {

    rows = 0;
    cols = 0;
    grid: Cell[][] = [];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid(this.rows, this.cols);
        this.generateMaze();
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

    // Draw the grid of cells
    show(p5: p5Types) {
        let cw: number = p5.width / this.cols;  // spacing between cells horizontally
        let cy: number = p5.height / this.rows; // spacing between cells vertically

        p5.push();
        for(let y = 0; y < this.grid.length; y++) {
            for(let x = 0; x < this.grid[y].length; x++) {
                switch(this.grid[y][x].type) {
                    case CELL_TYPE.empty: {
                        continue; // empty cells do not need to be rendered
                        break;
                    }
                    case CELL_TYPE.wall: {
                        p5.fill(0, 0, 0);
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
                p5.rect(x * cw, y * cy, cw, cy);
            }
        }
        p5.pop();
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
}
