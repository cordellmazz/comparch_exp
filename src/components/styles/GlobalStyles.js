import { createGlobalStyle } from "styled-components";

export const theme = {
    colors: {
        primary: "#bf5700",
        secondary: "#ffffff",
    },
    mobile: "768px",
};

// HERE WE DEFINE OUR GLOBAL STYLES
// this includes colors, fonts, and other styles that we want to be available everywhere
const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: pala;
      src: url("./assets/pala.ttf") format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
  
    h1 {
      font-size: 30px;
      margin-bottom: 20px;
      overflow-wrap: break-word;
      text-align: left;
      width: 100%;
    }

    p {
      font-size: 20px;
      margin-bottom: 20px;
      overflow-wrap: break-word;
      text-align: left;
      width: 100%;
    }
`;
export default GlobalStyles;
