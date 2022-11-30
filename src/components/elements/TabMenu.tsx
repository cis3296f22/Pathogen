import React, { ReactElement } from 'react'
import { Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Styles from './TabMenuStyes';
import Documentation from './DocumentationContainer'

export default class TabMenu extends React.Component<{}, {}> {

    //About
    Intro = `Pathogen shows a population of agents trying to find their way through a maze. The simulation provides a visual representation of how genetics evolve and reward positive outcomes over the course of multiple generations.`;

    Movement = [`Agents begin movement according to their 'genes' (an array of NSEW directions), or at random if their array of genes is empty.`,
    `Agents continue to move until they hit a wall (die).`];

    Fitness = [`When an agent dies, its individual level of fitness is calculated based off how far it traveled and the *dampening effect* of the cell it died in. (formula)`];

    Evolution = [`After all agents have died and their fitness has been calculated, the population enters an evolutionary phase.`,
    `Better fit agents are chosen to combine pass on their genes to the next generation`,
    `A mutation rate is applied, causing variance in the passing of genes`,
    `A new population is spawned at the start node, with their color indicating the success of their parents`,];

    //Instructions
    MazeParamsDescription = [`Number of rows in maze`,
    `Number of columns in maze`,
    `Apply -> Resets the simulation with updated grid size specifications`];

    CurrentParamsDescription = [`Mutation Rate (chance of variance during evolutionary phase)`,
        `Population Size (number of agents)`,
        `Regenerate Maze`,
        `Simulation Speed (Speed of visualization)`,
        `Skip Visualization (Shows agents after they've found optimal path)`];

    EditMazeDescription = [`Shift Click -> Turn a wall into a pathway`,
        `Regular Click -> Turn a pathway into a wall`];

    toList = (arr: string[]): ReactElement => {
        return <ul>{arr.map((str, i) => <li>{str}</li>)}</ul>;
    }

    render (): React.ReactElement {
        return (
            <>
                <Styles.TabContainer focusTabOnClick={false} >
                    <TabList>
                        <Tab>Instructions</Tab>
                        <Tab>About</Tab>
                    </TabList>

                    <TabPanel>
                        <h5>Edit Maze Parameters: <GiHamburgerMenu/> </h5> 
                        {this.toList(this.MazeParamsDescription)}

                        <h5>Edit Current Parameters: Top-right menu</h5>
                        {this.toList(this.CurrentParamsDescription)}

                        <h5>Manually Edit The Maze</h5>
                        {this.toList(this.EditMazeDescription)}
                    </TabPanel>

                    <TabPanel>
                        <h5>How it Works</h5>
                        <p>{this.Intro}</p>

                        <h5>Movement</h5>
                        {this.toList(this.Movement)}

                        <h5>Fitness</h5>
                        {this.toList(this.Fitness)}

                        <h5>Evolution</h5>
                        {this.toList(this.Evolution)}

                        Most Fit Parents <FaCircle color='0AF400'/> | Somewhat Fit Parents <FaCircle color='4B9600'/> | Least Fit Parents <FaCircle color='EA1400'/>
                        <br /> <br />
                        <div className='hoverDiv'><Documentation/></div>
                    </TabPanel>
                </Styles.TabContainer>
            </>
        )
    }
}
