import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import debounce from 'lodash.debounce'

export const useWindowWidth = (): {width: number} => {
	const [dimensions, setWidth] = useState({ width: window.innerWidth })

	useEffect(() => {
		const handler = debounce(() => {
			setWidth({ width: window.innerWidth })
		}, 10)

		window.addEventListener('resize', handler)

		return () => {
			window.removeEventListener('resize', handler)
		}
	})

	return dimensions
}

export const useSetVariableCssVars = (): void => {
	useEffect(() => {
		const setVh = debounce(() => {
			document.documentElement.style.setProperty('--vh', `${window.innerWidth}px`)
		}, 10)

		if(!isMobile) window.addEventListener('resize', setVh)

		return () => {
			if(!isMobile) window.removeEventListener('resize', setVh)
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
