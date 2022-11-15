import {describe, expect, test} from '@jest/globals';
import { Cell } from './Cell';
import { CELL_TYPE } from './Cell';
import  Grid  from './Grid';
import Agent from './Agent';
const  createGrid  = require('./Grid');
const  generateNewMaze  = require('./Grid');
const  createPopulation  = require('./Grid');
const  createPopulationFromPool  = require('./Grid');
const  getStartNodePosition  = require('./Grid');
const  getEndNodePosition  = require('./Grid');
const  getCell  = require('./Grid');
const  setMutationRate  = require('./Grid');
const  dampen  = require('./Cell');


export default class pathogen{}
describe("tests grid object", () => {
  test("makes sure the grid is correct", () => {
    var testGrid = new Grid(3,4,1000,2000,500);
    
    expect(testGrid.populationDeathToll).toBe(0);
    expect(testGrid.rows).toBe(3);
    expect(testGrid.cols).toBe(4);
    expect(testGrid.width).toBe(1000);
    expect(testGrid.height).toBe(2000);
    expect(testGrid.population.length).toBe(500);
  });
});
describe("Grid class", () => {
  test("tests createGrid method", () => {
    var testGrid = new Grid(2,3,1000,2000,500);
    let cells = [
      [new Cell(0, 0, CELL_TYPE.wall), new Cell(1, 0, CELL_TYPE.end_node), new Cell(2, 0, CELL_TYPE.wall)],
      [new Cell(0, 1, CELL_TYPE.wall), new Cell(1, 1, CELL_TYPE.start_node), new Cell(2, 1, CELL_TYPE.wall)]
    ];
    expect(testGrid.grid).toEqual(cells);
  });
});
describe("Grid class", () => {
  test("tests generateNewMaze method", () => {
    var testGrid = new Grid(2,3,1000,2000,500);
    
    expect(testGrid.generateNewMaze(2,3,500)).toEqual(testGrid);
  });
});
describe("Grid class", () => {
  test("tests createPopulation and createPopulationFromPool method", () => {
    var testGrid = new Grid(2,3,3000,2000,500);
    let agents = [new Agent(1500,1500),new Agent(1500,1500),new Agent(1500,1500)]
    
    expect(testGrid.createPopulation(3)).toEqual(agents);
    expect(testGrid.createPopulationFromPool(4,agents)).not.toEqual(agents);
  });
});
describe("Grid class", () => {
  test("tests getStartNodePosition method", () => {
    var testGrid = new Grid(2,3,3000,2000,500);
    
    expect(testGrid.getStartNodePosition()).toEqual({x: 1, y: 1});
  });
});
describe("Grid class", () => {
  test("tests getEndNodePosition method", () => {
    var testGrid = new Grid(2,3,3000,2000,500);
    
    expect(testGrid.getEndNodePosition()).toEqual({x: 1, y: 0});
  });
});
describe("Grid class", () => {
  test("tests getEndNodePosition method", () => {
    var testGrid = new Grid(2,3,3000,2000,500);
    var testCell = new Cell(0,0,CELL_TYPE.wall)
    expect(testGrid.getCell({x: 0, y: 0})).toEqual(testCell);
  });
});
describe("Grid class", () => {
  test("tests setMutationRate method", () => {
    var testGrid = new Grid(2,3,3000,2000,500);
    testGrid.setMutationRate(3);
    expect(testGrid.mutationRate).toBe(3);
  });
});
describe("Grid class", () => {
  test("tests isSolved method", () => {
    var testGrid = new Grid(2,3,3000,2000,500);
    expect(testGrid.solved).toBeFalsy();
  });
});
describe("Cell class", () => {
  test("tests dampen method", () => {
    var testCell = new Cell(0,0,CELL_TYPE.empty);
    testCell.dampen();
    expect(testCell.dampening).toBe(1);
  });
});
describe("Cell class", () => {
  test("tests getDampening method", () => {
    var testCell = new Cell(0,0,CELL_TYPE.empty);
    expect(testCell.getDampening()).toBe(0);
  });
});
describe("Agent class", () => {
  test("tests update method", () => {
    var testAgent = new Agent(1,1);
    testAgent.update();
    expect(testAgent.age).toBe(1);
  });
});
describe("Agent class", () => {
  test("tests kill method", () => {
    var testAgent = new Agent(1,1);
    testAgent.kill();
    expect(testAgent.dead).toBeTruthy();
  });
});
describe("Agent class", () => {
  test("tests isDead method", () => {
    var testAgent = new Agent(1,1);
    expect(testAgent.isDead()).toBeFalsy();
  });
});
describe("Agent class", () => {
  test("tests calculateFitness method", () => {
    var testAgent = new Agent(1,1);
    testAgent.calculateFitness(3);
    expect(testAgent.fitness).toBe(0);
  });
});
describe("Agent class", () => {
  test("tests setDistance method", () => {
    var testAgent = new Agent(1,1);
    testAgent.setDistance(10);
    expect(testAgent.dist).toBe(10);
  });
});
describe("Agent class", () => {
  test("tests getLastPosition method", () => {
    var testAgent = new Agent(1,1);
    expect(testAgent.getLastPosition()).toEqual({x: -1, y: -1});
  });
});
describe("Agent class", () => {
  test("tests setLastPosition method", () => {
    var testAgent = new Agent(1,1);
    testAgent.setLastPosition(3,4);
    expect(testAgent.last_pos).toEqual({x: 3, y: 4});
  });
});
describe("Agent class", () => {
  test("tests foundTarget method", () => {
    var testAgent = new Agent(1,1);
    testAgent.foundTarget()
    expect(testAgent.found_target).toBeTruthy();
  });
});