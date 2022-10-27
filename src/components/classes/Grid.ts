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
    }

    // Creates a new, empty grid (2d array of `Cells`) and returns it
    createGrid(rows: number, cols: number) {
        let grid: Cell[][] = [];
        for(let y = 0; y < rows; y++) {
            grid.push([]);
            for(let x = 0; x < cols; x++) {
                grid[y].push(new Cell(y, x, CELL_TYPE.empty));
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
                        p5.fill(255, 255, 255);
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
}
