import { Search20, Notification20, AppSwitcher20 } from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  Search,
  SearchSkeleton,
} from "carbon-components-react";
import React, { useRef, useState } from "react";

import { FunctionComponent } from "react";
import { useClickAway } from "react-use";
import "./header.scss";

interface UIShellProps {
  isActive: boolean;
  onClickSideNavExpand?: () => void;
}

const SiHeader: FunctionComponent<UIShellProps> = (props) => {
  const inputContainerRef = useRef<HTMLDivElement | null>(null);

  const [searchInputText, setSearchText] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useClickAway(inputContainerRef, () => {
    setIsSearching(false);
    setSearchToggle(false);
  });

  const onClickSideNavExpand = () => {
    if (props.onClickSideNavExpand) {
      props.onClickSideNavExpand();
    }
  };

  const searchBtnClickHandler = () => {
    setSearchToggle(true);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {

    if (event.target.value === "" && isSearching) {
      // 停止搜索
      setIsSearching(false);
    }
    setSearchText(event.target?.value);
  };

  const onEnterSearchingHanlder = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      setIsSearching((prev) => !prev);
    }
  };

  return (
    <Header aria-label="Silverwing Blog">
      <div ref={inputContainerRef}>
        {searchToggle && (
          <Search
            className="input"
            id="global-search"
            labelText="搜索内容"
            type="text"
            value={searchInputText}
            onChange={changeHandler}
            onKeyDown={onEnterSearchingHanlder}
          />
        )}
        {isSearching && <SearchSkeleton className="search-input-skeleton" />}
      </div>
      <HeaderMenuButton
        aria-label="Open menu"
        isCollapsible
        onClick={onClickSideNavExpand}
        isActive={props.isActive}
      />
      <HeaderName href="#" prefix="SW">
        Silverwing
      </HeaderName>
      <HeaderNavigation aria-label="Silverwing Blog">
        <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
        <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
          <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
          <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
          <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search" onClick={searchBtnClickHandler}>
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};

export default SiHeader;
