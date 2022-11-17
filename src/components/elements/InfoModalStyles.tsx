import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

import { Colors } from '../../tools/Constants';

export default class InfoModalStyles {
	static readonly ModalContainer = styled(Modal)`
        .modal-content {background-color: unset;}
    
        .modal-header, .modal-body, .modal-footer {
            background: ${Colors.PRIMARY_TRANSPARENT};
            color: white;
        }
	`
}
