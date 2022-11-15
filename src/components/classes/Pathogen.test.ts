import {describe, expect, test} from '@jest/globals';
import { Cell } from './Cell';
import { CELL_TYPE } from './Cell';
import  Grid  from './Grid';
import Agent from './Agent';
require('./Grid');
require('./Cell');


export default class pathogen{}
describe("grid object", () => {
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
	test("createGrid method", () => {
		var testGrid = new Grid(9, 5, 1000, 2000, 500);
		
		expect(testGrid.grid.length).toEqual(9);
		expect(testGrid.grid[0].length).toEqual(5);
	});

	test("generateNewMaze method", () => {
		var testGrid = new Grid(2,3,1000,2000,500);
		
		expect(testGrid.generateNewMaze(2,3,500)).toEqual(testGrid);
	});

	test("createPopulation and createPopulationFromPool method", () => {
		var testGrid = new Grid(2,3,3000,2000,500);
		let agents = [new Agent(1500,1500),new Agent(1500,1500),new Agent(1500,1500)]
		
		expect(testGrid.createPopulation(3)).toEqual(agents);
		expect(testGrid.createPopulationFromPool(4,agents)).not.toEqual(agents);
	});

	test("getStartNodePosition method", () => {
		var testGrid = new Grid(2,3,3000,2000,500);
		
		expect(testGrid.getStartNodePosition()).toEqual({x: 1, y: 1});
	});

	test("getEndNodePosition method", () => {
		var testGrid = new Grid(2,3,3000,2000,500);
		
		expect(testGrid.getEndNodePosition()).toEqual({x: 1, y: 0});
	});

	test("getEndNodePosition method 2", () => {
		var testGrid = new Grid(2,3,3000,2000,500);
		var testCell = new Cell(0,0,CELL_TYPE.wall)
		expect(testGrid.getCell({x: 0, y: 0})).toEqual(testCell);
	});

	test("setMutationRate method", () => {
		var testGrid = new Grid(2,3,3000,2000,500);
		testGrid.setMutationRate(3);
		expect(testGrid.mutationRate).toBe(3);
	});

	test("isSolved method", () => {
		var testGrid = new Grid(2,3,3000,2000,500);
		expect(testGrid.solved).toBeFalsy();
	});
});

describe("Cell class", () => {
	test("dampen method", () => {
		var testCell = new Cell(0,0,CELL_TYPE.empty);
		testCell.dampen();
		expect(testCell.dampening).toBe(2);
	});

	test("getDampening method", () => {
		var testCell = new Cell(0,0,CELL_TYPE.empty);
		expect(testCell.getDampening()).toBe(1);
	});
});

describe("Agent class", () => {
	test("update method", () => {
		var testAgent = new Agent(1,1);
		testAgent.update();
		expect(testAgent.age).toBe(1);
	});

	test("kill method", () => {
		var testAgent = new Agent(1,1);
		testAgent.kill();
		expect(testAgent.dead).toBeTruthy();
	});

	test("isDead method", () => {
		var testAgent = new Agent(1,1);
		expect(testAgent.isDead()).toBeFalsy();
	});

	test("calculateFitness method", () => {
		var testAgent = new Agent(1,1);
		testAgent.calculateFitness(3);
		expect(testAgent.fitness).toBe(0);
	});

	test("setDistance method", () => {
		var testAgent = new Agent(1,1);
		testAgent.setDistance(10);
		expect(testAgent.dist).toBe(10);
	});

	test("getLastPosition method", () => {
		var testAgent = new Agent(1,1);
		expect(testAgent.getLastPosition()).toEqual({x: -1, y: -1});
	});

	test("setLastPosition method", () => {
		var testAgent = new Agent(1,1);
		testAgent.setLastPosition(3,4);
		expect(testAgent.last_pos).toEqual({x: 3, y: 4});
	});

	test("foundTarget method", () => {
		var testAgent = new Agent(1,1);
		testAgent.foundTarget()
		expect(testAgent.found_target).toBeTruthy();
	});
});