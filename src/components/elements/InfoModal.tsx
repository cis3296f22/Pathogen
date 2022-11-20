// Third party
import React from 'react'
import IconButton from './IconButton';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from 'react-icons/gr';

// Custom styles
import Styles from './InfoModalStyles'

export default class InfoModal extends React.Component<{}, {open: boolean}> {

	constructor(props: {}) {
		super(props);
		this.state = {open: false};
	}

	open = (): void => { this.setState({ open: true }) }
	close = (): void => { this.setState({ open: false }) }
	
	render (): React.ReactElement {
		return (
            <>
                <IconButton icon={<AiOutlineInfoCircle/>} onClick={this.open}/>
                <Styles.ModalContainer dialogClassName={'dialogueClass'} show={this.state.open} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Help</Modal.Title>
                        <Styles.CloseButton icon={<GrClose/>} onClick={this.close} />
                    </Modal.Header>
                    <Modal.Body>Modal Body!</Modal.Body>
                    <Modal.Footer>Footer Content</Modal.Footer>
                </Styles.ModalContainer>
            </>
		)
	}
}