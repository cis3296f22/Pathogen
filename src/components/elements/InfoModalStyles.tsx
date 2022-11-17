import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

import { Colors } from '../../tools/Constants';
import IconButton from './IconButton';

export default class InfoModalStyles {
	static readonly ModalContainer = styled(Modal)`
        .modal-content {background-color: unset;}
    
        .modal-header, .modal-body, .modal-footer {
            background: ${Colors.PRIMARY_TRANSPARENT};
            color: white;
            border-color: #FFFFFFAF;
        }

        .modal-footer { text-align: center; }
	`

    static readonly CloseButton = styled(IconButton)`
        & > * > path {
            stroke: white !important;
        }
    `
}
