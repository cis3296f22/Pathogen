// Third party
import React from 'react'

// General tools
import useWindowDimensions, { useSetVariableCssVars } from './HelpfulFunctions'


const SetDimensions = (): React.ReactElement => {
	// This is a new component because when in <App>, it was reloading if scrolled in too soon and looking bad.
	document.documentElement.style.setProperty('--vh', `${useWindowDimensions().width}px`)
	useSetVariableCssVars()
	return (<></>)
}

export default SetDimensions
