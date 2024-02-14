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
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: pala;
    src: url("./assets/pala.ttf") format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  html {
    font-size: 10px;
  }
`;
export default GlobalStyle; 