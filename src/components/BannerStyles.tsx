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

	static readonly BannerSettings = styled.div`
		background-color: ${Colors.PRIMARY};
		margin: calc(var(--vh) * .02);
		margin-top: 0;
		
		width: calc(var(--vh) * .27);
		height: calc(var(--vh) * .1);

		display: grid;
		grid-template-columns: 20% 60% 20%;
		grid-template-rows: 70% 30%;
		justify-items: center;
		align-items: center;

		& > input {
			width: 80%;
		}
	`

	static readonly FastForward = styled.div`
		width: 100%;
		grid-column-start: 1;
		grid-column-end: 4;
		grid-row: 2;
		margin: 0;
		color: white;
		display: flex;
		justify-content: center;
	`

	static readonly OffcanvasStyle = styled(Offcanvas)`
		background-color: ${Colors.PRIMARY};
		color: white;
	`
}
