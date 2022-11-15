export enum CELL_TYPE {
    empty,      // part of the maze
    wall,       // wall in the maze
    start_node, // where the agents start
    end_node,   // where the agents finish/end
}

export class Cell {

    x: number = 0;                     // column position in the grid
    y: number = 0;                     // row position in the grid
    type: CELL_TYPE = CELL_TYPE.empty; // specifies the type of the current cell
    visited: boolean;          // used for maze generation
    dampening: number;

    constructor(x: number, y: number, type: CELL_TYPE) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.dampening = 1;
        this.visited = false;
    }

    dampen() { this.dampening++; }

    getDampening() { return this.dampening; }

    resetDampening() { this.dampening = 1; }
}
