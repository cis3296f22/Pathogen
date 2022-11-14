const Grid = require('getDeathToll')

export default class pathogen{}
describe("tests grid object", () => {
  test("makes sure the grid is correct", () => {
    var testGrid = new Grid(3,4,1000,2000,500);
    
    expect(Grid.getDeathToll()).toBe(0);
  });
});