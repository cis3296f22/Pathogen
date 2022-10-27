export enum CELL_TYPE {
    empty,
    wall,
    start_node,
    end_node
}

export class Cell {

    x: number = 0;
    y: number = 0;
    type: CELL_TYPE = CELL_TYPE.empty;

    constructor(x: number, y: number, type: CELL_TYPE) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}
