import React, { Component, ReactNode, useMemo, useState } from "react";

import { FunctionComponent } from "react";
import { useLocation } from "react-router";
import "./content.scss";
import SiHeader from "../Header/Header";
import { Grid, ToastNotification } from "carbon-components-react";
import SiSideNav from "../SideNav/SideNav";

interface SiContentProps {
  children?: ReactNode | FunctionComponent | Component | null;
}

const getPageName = (pathname: string): string => {
  switch (pathname) {
    case "/login":
      return "登录页";
    default:
      return "主页";
  }
};

const SiContent: FunctionComponent<SiContentProps> = (props) => {
  const { pathname } = useLocation();
  const [sideNavExpanded, setSideExpanded] = useState(false);

  const onClickSideNavExpand = () => {
    setSideExpanded((prev) => !prev);
  };
  const pageInfo = useMemo(() => {
    return getPageName(pathname);
  }, [pathname]);

  //  When sidenav is put into the grid,
  //  the calculation of its own width is inaccurate,
  //  and the left and right distance of grid padding is not subtracted
  return (
    <>
      <Grid fullWidth as="main" className="content">
        <SiHeader
          isActive={sideNavExpanded}
          onClickSideNavExpand={onClickSideNavExpand}
        />
        <h1>{pageInfo}</h1>
        {/* <ToastNotification className="toast-global" lowContrast={true} title="测试文本内容" /> */}
      </Grid>
      <SiSideNav expanded={sideNavExpanded} />
    </>
  );
};

export default SiContent;
