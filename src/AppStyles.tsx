import { createGlobalStyle } from 'styled-components'

import webFont1 from './assets/fonts/futura-medium-webfont.woff'
import webFont2 from './assets/fonts/futura-medium-webfont.woff2'
import arcaFont1 from './assets/fonts/arcamajora3-heavy-webfont.otf'
import arcaFont2 from './assets/fonts/arcamajora3-heavy-webfont.eot'
import arcaFont3 from './assets/fonts/arcamajora3-heavy-webfont.woff2'
import arcaFont4 from './assets/fonts/arcamajora3-heavy-webfont.woff'

export const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: 'Futura';
		src: url(${webFont1}) format('woff2'),
			url(${webFont2}) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'Arca';
		src: url(${arcaFont1}) format('otf'),
			url(${arcaFont2}) format('eot'),
			url(${arcaFont3}) format('woff2'),
			url(${arcaFont4}) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.App {
		text-align: center;
		display: grid;

		grid-template-rows: calc(var(--vh) * .3);
		align-items: center;
	}

	.react-p5 {
		display: flex;
	}
`
