import React, { useState } from 'react';

import { GlobalStyles } from './AppStyles';
import Banner from './components/Banner';
import Canvas from './components/Canvas';
import { Parameters } from './components/CanvasStyles';

import 'bootstrap/dist/css/bootstrap.min.css';
import Constants from './tools/Constants';
import { useWindowWidth } from './tools/HelpfulFunctions';

function App() {
	const [params, setParameters] = useState<Parameters>(Constants.PARAMS);
	return (
		<div className='App'>
			<GlobalStyles/>
			<Banner setParameters={setParameters} params={params} />
			<Canvas params={params} setParameters={setParameters} windowWidth={useWindowWidth().width}/>
		</div>
	);
}

export default App;
