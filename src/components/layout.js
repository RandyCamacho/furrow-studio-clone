import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "styled-normalize";

import Header from "./header";
import Cursor from "./customCursor";
import Navigation from "./navigation";

import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext";
import Footer from "./footer";

const GlobalStyle = createGlobalStyle`
  ${normalize}

 * {
   text-decoration: none;
   cursor: none;
}

html {
  box-sizing:box;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", 'Helvetica', sans-serif;
  background: ${(props) => props.theme.background};
  overscroll-behavior: none;
  overflow-x: hidden

}

`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [hamburgerPosition, setHamburgerPosition] = useState({
    x: 0,
    y: 0,
  });

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: "#ea291e",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  };

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red: "#ea291e",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  };

  const { currentTheme, cursorStyle } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursor = (cursorType) => {
    cursorType = (cursorStyle.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Cursor toggleMenu={toggleMenu} />
      <Header
        hamburgerPosition={hamburgerPosition}
        setHamburgerPosition={setHamburgerPosition}
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <Navigation
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        onCursor={onCursor}
      />
      <main>{children}</main>
      <Footer onCursor={onCursor} />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
