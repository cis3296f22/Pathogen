export enum CELL_TYPE {
    /**
     * part of the maze
     */
    empty,
    /**
     * wall in the maze
     */
    wall,
    /**
     * where the agents start
     */
    start_node,
    /**
     * where the agents finish/end
     */
    end_node, 
}

export class Cell {
    /**
     * Column position in the grid
     */
    x: number = 0;
    /**
     * Row position in the grid
     */
    y: number = 0;
    /**
     * Specifies the type of the current cell
     */
    type: CELL_TYPE = CELL_TYPE.empty;
    /**
     * Used for maze generation
     */
    visited: boolean;
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
