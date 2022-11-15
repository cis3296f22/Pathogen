import {describe, expect, test} from '@jest/globals';
import { Cell } from './Cell';
import { CELL_TYPE } from './Cell';
import  Grid  from './Grid';
import Agent from './Agent';
const  createGrid  = require('./Grid');
const  generateNewMaze  = require('./Grid');
const  createPopulation  = require('./Grid');
const  getStartNodePosition  = require('./Grid');
const  getEndNodePosition  = require('./Grid');


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
      [new Cell(0, 0, CELL_TYPE.wall), new Cell(1, 0, CELL_TYPE.wall), new Cell(2, 0, CELL_TYPE.wall)],
      [new Cell(0, 1, CELL_TYPE.wall), new Cell(1, 1, CELL_TYPE.wall), new Cell(2, 1, CELL_TYPE.wall)]
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
  test("tests createPopulation method", () => {
    var testGrid = new Grid(2,3,3000,2000,500);
    let agents = [new Agent(1500,1500),new Agent(1500,1500),new Agent(1500,1500)]
    
    expect(testGrid.createPopulation(3)).toEqual(agents);
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
    
    expect(testGrid.getEndNodePosition()).toEqual({x: 1, y: 0
    });
  });
});