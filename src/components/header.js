import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";

import { HeaderNav, Logo, Menu } from "../styles/headerStyles";
import { Container, FlexBox } from "../styles/globalStyles";

import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext";

import useElementPosition from "../hooks/useElementPosition";

const Header = ({
  onCursor,
  toggleMenu,
  setToggleMenu,
  hamburgerPosition,
  setHamburgerPosition,
}) => {
  const dispatch = useGlobalDispatchContext();
  const { currentTheme } = useGlobalStateContext();
  const hamburger = useRef(null);
  const position = useElementPosition(hamburger);

  const menuHover = () => {
    onCursor("locked");
    setHamburgerPosition({ x: position.x, y: position.y + 72 });
  };

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      dispatch({ type: "TOGGLE_THEME", theme: "light" });
    } else {
      dispatch({ type: "TOGGLE_THEME", theme: "dark" });
    }
  };

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <HeaderNav
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 1 }}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <Container>
        {console.log({ currentTheme })}
        <FlexBox spaceBetween noHeight>
          <Logo
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={onCursor}
          >
            <Link to="/">FURR</Link>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={onCursor}
            ></span>
            <Link to="/">W</Link>
          </Logo>
          <Menu
            ref={hamburger}
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
            onMouseEnter={menuHover}
            onMouseLeave={onCursor}
          >
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </FlexBox>
      </Container>
    </HeaderNav>
  );
};

export default Header;
