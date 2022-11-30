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


		.hoverDiv { 
            justify-content: space-evenly;
            text-align: center;
			display: flex;

            img {
                width: 50vw;
                border-radius: 5px;
            }
                
            .hover_img a { 
                position:relative;
                text-decoration: none;
                font-weight: bold;
                color: white;
            }
            .hover_img a span { 
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                position:fixed; 
                display:none;
                z-index:99; 
            }
            .hover_img a:hover span { display:block; }
        }



	`
}
