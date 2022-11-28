import styled from 'styled-components'
import BannerBackground from '../assets/Pathogen.png'
import { GiHamburgerMenu } from 'react-icons/gi';
import { Colors } from '../tools/Constants';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Slider from './elements/Slider';

export default class BannerStyles {
	static readonly Banner = styled.div`
		background-image: url(${BannerBackground});
		background-size: cover;
		background-position: center;
		height: 100%;
		width: var(--vh);

		display: flex;
		justify-content: space-between;
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

	static readonly SliderStyle = styled(Slider)`
		padding: 4%;
		
		& > p {
			font-size: calc(var(--vh) * .016);
		}
	`

	static readonly OffcanvasContainer = styled(Offcanvas)`
		background-color: ${Colors.PRIMARY_TRANSPARENT};
		color: white;
		width: calc(var(--vh) * .3) !important;

		& > button {
			margin: 4%;
			width: 80%;
			align-self: center;
		}

		& > .offcanvas-header > .offcanvas-title {
			font-size: calc(var(--vh) * .02);
		}
	`

	static readonly ApplyButton = styled.button`
		&, :hover {
			background-color: ${Colors.BLUE};
			border-color: ${Colors.BLUE};
		}
	`
}
