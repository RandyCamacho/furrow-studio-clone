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

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: "#ea291e",
  };

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red: "#ea291e",
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
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;