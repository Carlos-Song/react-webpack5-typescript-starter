import React, {
  Component,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { FunctionComponent } from "react";
import { useLocation } from "react-router";
import "./content.scss";
import SiHeader from "../Header/Header";
import { Button, Column, Grid, Loading, Row } from "carbon-components-react";
import { useQuery } from "urql";

import SiSideNav from "../SideNav/SideNav";
import _ from "lodash";
import office from "common/assets/jpeg/office.jpg";
import office2 from "common/assets/jpeg/office2.jpg";
import forest from "common/assets/jpeg/forest.jpg";
import BasicTable from "../Table/Table";
import CenteredGrid from "./ContentMaterial";

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




const MoviesQuery = `
  query {
    movies {
      id
      movieName
      director
      yearReleased
    }
  }
`;

export interface Movie {
  movieName: string;
  id: number;
  director: string;
  yearReleased: number;
}

const SiContent: FunctionComponent<SiContentProps> = () => {
  const { pathname } = useLocation();
  const [sideNavExpanded, setSideExpanded] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const onClickSideNavExpand = () => {
    setSideExpanded((prev) => !prev);
  };

  const [{ data, fetching, stale }, reexecuteQuery] = useQuery({
    query: MoviesQuery,
    pause: true,
  });

  const onButtonClickHandler = () => {
    reexecuteQuery();
  };

  useEffect(() => {
    if (data && data.movies.length > 0) {
      setMovies(data.movies);
    }
  }, [data]);

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
        <Grid className="banner-area">
          <h1>{pageInfo}</h1>
          {/* <MyEditor /> */}
        </Grid>
        {/* <Grid className="data-container">
          {_.range(0, 12).map((opt) => {
            return (
              <Grid key={opt} className="cell-container">
                <div className="cell-top">
                  <img className="cell-image" src={getModNumber(opt)} />
                  <h2>Block {opt}</h2>
                </div>
                <div className="cell-bottom">
                  <h5>{getModTitle(opt)}</h5>
                  <div>
                    <p>Carlos Wiles</p>
                    <p>2021 3 3</p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid> */}
        <CenteredGrid />
        <Grid className="content-inside">
          {/* <MyEditor /> */}
          {/* <Editor plugins={plugins} initialState={initialState} /> */}
          <Button onClick={onButtonClickHandler}>点击就送</Button>

          {fetching && stale ? <Loading /> : null}
          <BasicTable
            headers={["id", "movieName", "director", "yearReleased"]}
            dataList={movies}
          />
        </Grid>
        ``
        {/* <ToastNotification className="toast-global" lowContrast={true} title="测试文本内容" /> */}
      </Grid>
      <SiSideNav expanded={sideNavExpanded} />
    </>
  );
};

export default SiContent;
