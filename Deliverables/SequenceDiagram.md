```
sequenceDiagram

    actor user
    participant Banner

    Note right of Canvas: Grid Constructor: creates the inital maze and population
    Canvas->>+Grid: newGrid()
    Grid->>Grid: createGrid()
    Grid->>Grid: generateMaze()
    Grid->>Grid: createPopulation()
    Grid-->>-Canvas: createPopulation()
    
    %% Canvas->>+Grid: grid.generateMaze()
    %% Canvas->>+Grid: grid.createPopulation()
    %% Grid-->>Canvas: maze created
user ->>+ Banner: Change simulation speed
Banner ->> Canvas: 
Note right of user: How many times the update loop runs 

    loop draw canvas
        Note right of Canvas: p5.js draw() function that continuously  redraws the canvas
        Canvas->>Grid: grid.show()
        Note right of Grid: Draws cells and agents onto canvas
        loop
            Note right of Canvas: update loop controlsspeed of simulation
            Canvas->>+Grid: grid.update()
            Note right of Grid: updates the position of the agents in the maze
            alt If all agents are dead 
                Note right of Grid: Evolutionary phase <br> new generation created
                Grid->>Agent: agent.calculateFitness()
                Grid->>Grid: createPopulation()
            end
            Grid->>Agent: agent.update()
            Note right of Agent: Agents move based on DNA
            Grid-->>-Canvas: agents on grid updated
        end
    end

    
    user ->>+ Banner: set population
    Note right of user: restarts process
    ```
