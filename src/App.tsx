import React from 'react';

import Canvas from './components/Canvas';
import Styles, { GlobalStyles } from './AppStyles';

function App() {
	return (
		<div className='App'>
			<GlobalStyles/>
			<Styles.Banner/>
			<Canvas/>
		</div>
	);
}

export default App;
