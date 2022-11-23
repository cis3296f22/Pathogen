import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

import { Colors } from '../../tools/Constants';
import IconButton from './IconButton';

export default class InfoModalStyles {

    static readonly InfoButton = styled(IconButton)`
        font-size: calc(var(--vh) * .02);
        position: absolute;
        top 0;
        left 0;
        margin: 10px;
    `

	static readonly ModalContainer = styled(Modal)`
        .modal-dialog {
            width: 75vw;
            max-width: 100vw;

        }

        .modal-content {background-color: unset;}
    
        .modal-header, .modal-body, .modal-footer {
            background: ${Colors.PRIMARY_TRANSPARENT};
            color: white;
            border-color: #FFFFFFAF;
        }
        .modal-footer { text-align: center; }

        .react-tabs {
            color: white;
            background: ${Colors.PRIMARY_TRANSPARENT};
            
            .react-tabs__tab-list {
                display: grid;
                grid-template-columns: 50% 50%;
                text-align: center;
                border-bottom: none;
                bottom: 0px;
            }

            .react-tabs__tab-panel {
                h2 {text-align: center;}
                padding: 20px;
                white-space: pre-line;
            }
        }
	`

    static readonly CloseButton = styled(IconButton)`
        & > * > path {
            stroke: white !important;
        }
    `
 
}
