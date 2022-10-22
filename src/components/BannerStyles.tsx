import styled from 'styled-components'
import BannerBackground from '../assets/Banner.jpeg'
import { FONT_FAMILY } from '../tools/Constants'

export default class BannerStyles {
	static readonly Banner = styled.div`
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BannerBackground});
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		& > h1 {
			color: white;
			margin: 0;
			${FONT_FAMILY.TITLE}
		}
	`
}
