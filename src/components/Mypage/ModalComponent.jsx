import React from "react";
import { Button, Modal } from "react-bootstrap";
import AddAsset from "./AddAsset";

const ModalComponent = ({ show, onHide, setAddMode}) => {
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
						내 자산 추가
					</Modal.Title>
				</Modal.Header>
				
					{/* 자산 추가 form */}
					<AddAsset onHide={onHide} setAddMode={setAddMode}/>
				
			</Modal>
		</div>
	);
};

export default ModalComponent;
