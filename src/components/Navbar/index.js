import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavBtnLink2,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

import ApiKey from "../ApiKey";

const Navbar = ({ toggle }) => {
  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://frogcoin.fun25.co.kr:80",
    url: "auth/session",
  });

  const { data2, loading2, error2 } = useAxios({
    method: "get",
    baseURL: "http://frogcoin.fun25.co.kr:80",
    url: "searchNum",
  });

  const signoutHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("된다");
      await axios.get("http://frogcoin.fun25.co.kr:80/auth/logout");
      window.location.replace("/");
    } catch {
      console.log("로그아웃 오류");
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" onClick={handleClick}>
            {" "}
            Frog{" "}
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            {data ? (
              <NavItem>
                <NavLinks
                  to="signup"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  MyPage
                </NavLinks>
              </NavItem>
            ) : null}
            <NavItem>
              <NavLinks
                to="chart"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Chart
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="news"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                News
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="discover"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                ETF
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="community"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Community
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="community"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                회원 {data2}: 비회원 :
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            {data ? (
              <>
                <ApiKey />
                <NavBtnLink2 to="/" onClick={signoutHandler}>
                  Sign Out
                </NavBtnLink2>
              </>
            ) : (
              <NavBtnLink to="/signin">Sign In/Up</NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

// function lala(state) {
//   return {
//     state,
//   };
// }

export default Navbar;
