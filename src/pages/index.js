import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InfoSection from "../components/InfoSection";
import ChartSection from "../components/ChartSection";
import { NewsContextProvider } from "../components/News/NewsContext";
import NewS2 from "../components/News/index2";
import Discover2 from "../components/Discover/index2";
// import AboutModal from "../components/AboutModal/";
// import MdVideo from '../video/MdVideo/MdVideo.mp4';
// import styled from 'styled-components';
import PostBoards from "../components/PostBoard/PostBoard";

import {
	homeETF,
	homeChart,
	homeNews,
	homeMypage,
  homePost,
} from "../components/InfoSection/Data";
import Scroll from "../components/Scroll";
import Mypage from "../components/Mypage/index.jsx";
import useAxios from "../hooks/useAxios";

// const AboutBg = styled.div`
// width: 100%;
// height: 100% fit-content;

// `;
// const MdVideoBg = styled.video`
// width: 100%;
// height: 100%;
// -o-object-fit: cover;
// object-fit: cover;
// background: #232a34;
// `;

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://frogcoin.fun25.co.kr:80",
    url: "auth/session",
  });

	return (
		<>
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />
			<HeroSection />
			{data ? (
				<InfoSection {...homeMypage}>
					<Mypage />
				</InfoSection>
			) : null}
			<InfoSection {...homeChart}>
				<ChartSection />
			</InfoSection>
			<InfoSection {...homeNews}>
				<NewsContextProvider>
					<NewS2 />
				</NewsContextProvider>
			</InfoSection>
			<InfoSection {...homeETF}>
				<Discover2 />
			</InfoSection>
			<InfoSection {...homePost}>
        <PostBoards page="index" />
			</InfoSection>
			<Scroll showBelow={250} />
			<Footer />
		</>
	);
};

export default Home;
