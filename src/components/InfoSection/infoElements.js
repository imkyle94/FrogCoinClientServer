import styled from "styled-components";

export const InfoContainer = styled.div`
color: #fff;
background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : '#fff')};
height: 100vh;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const InfoWrapper = styled.div`
z-index: 1;
min-height: 800px;
width: 100%;
max-width: 1000px;
margin-right: auto;
margin-left: auto;
padding: 24px;
padding-top:48px;
justify-content: center;
`
export const InfoRow = styled.div`
align-items: center;

@media screen and (max-width:768px) {
     
}
@media screen and (max-width: 480px) {
    font-size: 32px;
}
`

export const Column1 = styled.div`
display: relative;
margin-bottom: 15px;
padding: 0 15px;

`
// export const Column2 = styled.div`
// margin-bottom: 15px;
// padding: 0 15px;
// grid-area: col2;
// `

export const TextWrapper = styled.div`
  padding-top: 0;
  padding-bottom: 60px;
`;

export const TopLine = styled.p`
  color: #01bf71;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
margin-bottom: 24px;
font-size: 48px;
line-height: 1.1;
font-weight: 600;
color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#010606')
    };

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
max-width: 440px;
margin-bottom: 35px;
font-size: 18px;
line-height: 24px;
color: ${({ darkText }) => (darkText ? '#010606' : '#black')
    };
`

export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;

// export const ImgWrap = styled.div`
// max-width: 555px;
// height: 100%;
// `

// export const Img = styled.img`
// width: 100%;
// margin: 0 0 10px 0;
// padding-right: 0;
// `
