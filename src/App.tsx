import React, { useState } from 'react';

import { GlobalStyles } from './AppStyles';
import Banner from './components/Banner';
import Canvas from './components/Canvas';
import { Parameters } from './components/CanvasStyles';

import 'bootstrap/dist/css/bootstrap.min.css';
import Constants from './tools/Constants';
import { useWindowWidth } from './tools/HelpfulFunctions';

function App() {
	const [params, setParameters] = useState<Parameters>({gridColumns: Constants.DEFAULT_COLS, gridRows: Constants.DEFAULT_ROWS});
	return (
		<div className='App'>
			<GlobalStyles/>
			<Banner setParameters={setParameters} />
			<Canvas params={params} windowWidth={useWindowWidth().width}/>
		</div>
	);
}

export default App;
