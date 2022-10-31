import styled from 'styled-components'
import BannerBackground from '../assets/Pathogen.png'
import { GiHamburgerMenu } from 'react-icons/gi';
import { Colors } from '../tools/Constants';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default class BannerStyles {
	static readonly Banner = styled.div`
		background-image: url(${BannerBackground});
		background-size: cover;
		background-position: center;
		height: 100%;
		width: var(--vh);

		display: flex;
	`

	static readonly Hamburger = styled(GiHamburgerMenu)`
		font-size: calc(var(--vh) * .04);
		color: ${Colors.PRIMARY};

		margin: calc(var(--vh) * .01);
		:hover {
			color: ${Colors.SECONDARY};
			cursor: pointer;
		}
	`

	static readonly OffcanvasStyle = styled(Offcanvas)`
		background-color: ${Colors.PRIMARY};
		color: white;
	`
}
