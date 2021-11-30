import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Video from "../../video/video.mp4";
import { Button } from "../ButtonElements";
import {
	HeroContainer,
	HeroBg,
	VideoBg,
	HeroContent,
	HeroH1,
	HeroP,
	HeroBtnWrapper,
	ArrowForward,
	ArrowRight,
} from "./HeroElements";

const HeroSection = () => {
	const [hover, setHover] = useState(false);

	const onHover = () => {
		setHover(!hover);
	};

	const { data, loading, error } = useAxios({
		method: "get",
		baseURL: "http://frogcoin.fun25.co.kr:80",
		url: "auth/session",
	});

	return (
		<HeroContainer id="home">
			<HeroBg>
				<VideoBg autoPlay loop muted src={Video} type="video/mp4" />
			</HeroBg>
			<HeroContent>
				<HeroH1>개구리 투자분석</HeroH1>
				<HeroP>오늘 회원가입하면 250$상당의 XRP 지급</HeroP>
				{!data && (
					<HeroBtnWrapper>
						<Button
							to="signup"
							onMouseEnter={onHover}
							onMouseLeave={onHover}
							primary="true"
							dark="true"
							smooth={true}
							duration={500}
							spy={true}
							exact="true"
							offset={-80}
						>
							Get started {hover ? <ArrowForward /> : <ArrowRight />}
						</Button>
					</HeroBtnWrapper>
				)}
			</HeroContent>
		</HeroContainer>
	);
};

export default HeroSection;
