import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FooterContainer,FooterWrap, FooterLinksContainer, FooterLinksWrapper,FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink} from './FooterElements'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle> 회사 정보 </FooterLinkTitle>
                                <FooterLink to="/"> 운영방식</FooterLink>
                                <FooterLink to="/"> 특징</FooterLink>
                                <FooterLink to="/"> 업무 이해도</FooterLink>
                                <FooterLink to="/"> 투자자 </FooterLink>
                                <FooterLink to="/"> Terms of Service</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> 고객센터 </FooterLinkTitle>
                                <FooterLink to="/"> 공지사항</FooterLink>
                                <FooterLink to="/"> 연락처 </FooterLink>
                                <FooterLink to="/"> 1:1 상담봇</FooterLink>
                                <FooterLink to="/"> FAQ 질문</FooterLink>
                                <FooterLink to="/"> 개인정보취급방침 </FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle> 커뮤니티 </FooterLinkTitle>
                                <FooterLink to="/"> 스크립트 </FooterLink>
                                <FooterLink to="/"> 스트림</FooterLink>
                                <FooterLink to="/"> API 수익 랭킹</FooterLink>
                                <FooterLink to="/"> 트위터</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> 비즈니스 </FooterLinkTitle>
                                <FooterLink to="/"> 광고</FooterLink>
                                <FooterLink to="/"> 파트너 프로그램</FooterLink>
                                <FooterLink to="/"> 위젯</FooterLink>
                                <FooterLink to="/"> 웹사이트 & 브로커 솔루션 </FooterLink>
                                <FooterLink to="/"> 컨텐츠 스트림 $ RSS</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to = '/'>
                            Frog
                        </SocialLogo>
                        <WebsiteRights>Frog © {new Date().getFullYear()} 
                        All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href = "//www.facebook.com" target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href = "//www.instagram.com" target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href = "//www.youtube.com" target="_blank" aria-label="Youtube">
                                <FaYoutube />
                            </SocialIconLink>
                            <SocialIconLink href = "//www.twitter.com" target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer

