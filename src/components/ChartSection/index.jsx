import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import CoingeckoCoinDetail from "./Coingecko/CoinDetail";
import CoingeckoCoinList from "./Coingecko/CoinList";
import "./index.scss";
import ModalComponent from "./ModalComponent";
import UpbitCoinList from "./Upbit/CoinList";

const ChartSection = () => {
	const [tab, setTab] = useState("Coingecko");
	const [modalShow, setModalShow] = useState(false);
	const [coinId, setCoinId] = useState();

	const handleModalShow = () => {
		setModalShow(!modalShow);
	};

	const handleTabClick = () => (e) => {
		console.log(e.target.innerText);
		setTab(e.target.innerText);
	};

	return (
		<div className="coins-container">
			<ButtonGroup className="mt-2 mx-2">
				<Button className="tab" onClick={handleTabClick()} variant="success">
					Coingecko
				</Button>
				<Button className="tab" onClick={handleTabClick()} variant="primary">
					Upbit
				</Button>
			</ButtonGroup>
			{tab === "Coingecko" ? (
				<CoingeckoCoinList onHide={handleModalShow} setCoinId={setCoinId} />
			) : (
				<UpbitCoinList onHide={handleModalShow} setCoinId={setCoinId}/>
			)}
			<ModalComponent show={modalShow} onHide={handleModalShow}>
				<CoingeckoCoinDetail coinId={coinId} />
			</ModalComponent>
		</div>
	);
};

export default ChartSection;
