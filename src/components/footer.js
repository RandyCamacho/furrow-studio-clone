import React from "react";

import { Container, FlexBox } from "../styles/globalStyles";
import { Instagram, Facebook, Vimeo } from "../assets/svg/social-icons";
import { FooterContent, FooterSocial, FooterNav } from "../styles/footerStyles";

const Footer = ({ onCursor }) => {
  return (
    <FooterNav>
      <Container>
        <FlexBox spaceBetween>
          <FooterContent>
            <p>902.315.1279</p>
            <p>info@furrow.studio</p>
          </FooterContent>
          <FooterContent wider>
            <p>15 Cam Unit C</p>
            <p>Charlottetown, PE C1E 0E2</p>
          </FooterContent>
          <FooterSocial>
            <a
              onMouseEnter={() => onCursor("hovered")}
              onMouseLeave={onCursor}
              href="/"
            >
              <Instagram />
            </a>
            <a
              onMouseEnter={() => onCursor("hovered")}
              onMouseLeave={onCursor}
              href="/"
            >
              <Facebook />
            </a>
            <a
              onMouseEnter={() => onCursor("hovered")}
              onMouseLeave={onCursor}
              href="/"
            >
              <Vimeo />
            </a>
          </FooterSocial>
        </FlexBox>
      </Container>
    </FooterNav>
  );
};

export default Footer;
