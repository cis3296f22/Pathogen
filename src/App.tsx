import React, { useState } from 'react';

import { GlobalStyles } from './AppStyles';
import Banner from './components/Banner';
import Canvas from './components/Canvas';
import { Parameters } from './components/CanvasStyles';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Constants from './tools/Constants';
import { useWindowWidth } from './tools/HelpfulFunctions';

function App() {
	const [params, setParameters] = useState<Parameters>(Constants.PARAMS);
	return (
		<div className='App'>
			<GlobalStyles/>
			<Banner setParameters={setParameters} />
			<Canvas params={params} windowWidth={useWindowWidth().width}/>
		</div>
	);
}

export default App;
