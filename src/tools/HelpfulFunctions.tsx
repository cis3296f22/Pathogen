import { useEffect, useState } from 'react'

import debounce from 'lodash.debounce'

export const scrollToTop = (): void =>{
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}

export const useSetVariableCssVars = (): void => {
	useEffect(() => {
		const setVh = debounce(() => {
			document.documentElement.style.setProperty('--vh', `${window.innerWidth}px`)
		}, 10)

		window.addEventListener('resize', setVh)

		return () => {
			window.removeEventListener('resize', setVh)
		}
	})
}


function getWindowDimensions(): {width: number, height: number} {
	const { innerWidth: width, innerHeight: height } = window
	return {
		width,
		height
	}
}

export default function useWindowDimensions(): {width: number, height: number} {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

	useEffect(() => {
		setWindowDimensions(getWindowDimensions())
	}, [])

	return windowDimensions
}
