// Third party
import React from 'react';
import { FaDna, FaViruses, FaPercent } from 'react-icons/fa';
import ProgressBar from 'react-bootstrap/ProgressBar';


// Custom styles
import Styles, { SimContextProps } from './SimContextStyles'

export default class SimContext extends React.Component<SimContextProps, { open: boolean }> {

    constructor(props: SimContextProps) {
		super(props)
		this.state = { 
			open: true
		}
	}

	render (): React.ReactElement {
		return (
			<Styles.SimContextContainer open={this.state.open} className='dropdown-container'>
                    <Styles.MutationRate>
                        Mutation <FaDna/> <br/>
                        {this.props.mutationRate}%
                    </Styles.MutationRate>
                    <Styles.progressbar>
                        Progress <br/>
                        <ProgressBar striped variant="danger" now={this.props.progress} label={`${this.props.progress}%`} />
                    </Styles.progressbar>

                    <Styles.GenerationCounter>
                        Generations <FaViruses/> <br/>
                        {this.props.generation}
                    </Styles.GenerationCounter>
            </Styles.SimContextContainer>
		)
	}
}
