import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComponent = ({ show, onHide, children}) => {
	return (
		<div >
			<Modal
				show={show}
				onHide={onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						기간별 차트
					</Modal.Title>
				</Modal.Header>
				{children}
			</Modal>
		</div>
	);
};

export default ModalComponent;
