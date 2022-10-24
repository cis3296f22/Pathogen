# Pathogen

Pathogen is a pathfinding genetic algorithm visualization. A population of agents is spawned at the start node maze with the goal to reach the end node. Agents navigate through a maze, achieving the optimal path through a series of evolutionary steps. Mazes can be auto-generated, manually inputted by the user, or loaded. Each population of agents is known as a generation. Initially, agents in the first generation move at random. Once each agent dies (from hitting the maze wall) from the current generation, its fitness is calculated. Agents from the last generation are then inserted into a mating pool to create the next generation. Agents with the highest fitness values in the mating pool have a higher likelihood of being selected as parents (selection). Parents are selected to create new child agents until the new generation's population size is equal to the previous population size (mating). When parents create a child agent, the genes of each parent are spliced in half and combined into the new child's genes (crossover). Each gene in the new child's genes has a chance at mutating (mutation). Over time, this evolutionary process of: 'selection', 'mating', 'crossover', and 'mutation' converges to a population of agents that optimally find the path through the maze.

## Installation

1. Download the latest release from the [releases](https://github.com/cis3296f22/Pathogen/releases) section.

2. Download the latest version of [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):

```sh
npm install -g npm
```

3. Install dependencies listed in `package.json` (must be in root of project):

```sh
npm install
```

## Run Project

```sh
npm run start
```
