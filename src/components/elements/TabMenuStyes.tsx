import { Tabs } from 'react-tabs'
import styled from 'styled-components'
import { Colors } from '../../tools/Constants'

export default class TabStyles {
	static readonly TabContainer = styled(Tabs)`
		color: white;
		background-color: ${Colors.PRIMARY_TRANSPARENT};

		& > .react-tabs__tab-list {
			display: grid;
			grid-template-columns: 50% 50%;
			text-align: center;
			border: none;
			bottom: 0px;
		}

		& > * > .react-tabs__tab--selected {
			border-color: unset;
		}

		& > .react-tabs__tab-panel {
			h2 {text-align: center;}
			padding: 20px;
			white-space: pre-line;
		}
	`
}
