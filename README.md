# Pathogen 🧬

Pathogen is a pathfinding genetic algorithm visualization. A population of agents is spawned at the start node maze with the goal to reach the end node. Agents navigate through a maze, achieving the optimal path through a series of evolutionary steps. Mazes can be auto-generated, manually inputted by the user, or loaded. Each population of agents is known as a generation. Initially, agents in the first generation move at random. Once each agent dies (from hitting the maze wall) from the current generation, its fitness is calculated. Agents from the last generation are then inserted into a mating pool to create the next generation. Agents with the highest fitness values in the mating pool have a higher likelihood of being selected as parents (selection). Parents are selected to create new child agents until the new generation's population size is equal to the previous population size (mating). When parents create a child agent, the genes of each parent are spliced in half and combined into the new child's genes (crossover). Each gene in the new child's genes has a chance at mutating (mutation). Over time, this evolutionary process of: 'selection', 'mating', 'crossover', and 'mutation' converges to a population of agents that optimally find the path through the maze. The user will be able to skip ahead multiple generations to speed up the process, and reset the application if they don't like the maze or how the agents are evolving. 

## Demo

Click [here](https://cis3296f22.github.io/Pathogen/) to try out the visualization.

## Web Application

### Install

1. Download the latest release from the [releases](https://github.com/cis3296f22/Pathogen/releases) section.

2. Download the latest version of [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):

```sh
npm install -g npm
```

3. Install dependencies listed in `package.json` (must be in root of project):

```sh
npm install
```

### Run

```sh
npm run start
```

### Deploy

1. Deploy to GitHub Pages:

```sh
npm run deploy
```

## Executable

### Install

1. Download the latest release from the [releases](https://github.com/cis3296f22/Pathogen/releases) section.

2. Download the latest version of [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):

```sh
npm install -g npm
```

3. Install dependencies listed in `package.json` (must be in root of project):

```sh
npm install
```

4. Download the latest version of [yarn](https://yarnpkg.com/getting-started/install)

### Package

1. Package the application into an executable file:

```sh
yarn electron:package:<mac|windows|linux>
```

The executable that is created is located in the `dist/` directory.

## Project Board

Link to [project board](https://github.com/orgs/cis3296f22/projects/112)