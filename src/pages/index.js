import React from "react";
import Layout from "../components/layout";
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext";
import HomeBanner from "../components/homepage/HomeBanner";
import HomeContent from "../components/homepage/HomeContent";
import HomeFeature from "../components/homepage/HomeFeature";
import HomeAbout from "../components/homepage/HomeAbout";

const IndexPage = (props) => {
  const { cursorStyle } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursor = (cursorType) => {
    cursorType = (cursorStyle.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };

  return (
    <Layout>
      <HomeBanner onCursor={onCursor} />
      <HomeContent />
      <HomeFeature onCursor={onCursor} />
      <HomeAbout onCursor={onCursor} />
    </Layout>
  );
};

export default IndexPage;
