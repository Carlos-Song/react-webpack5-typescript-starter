import { Fade16 } from "@carbon/icons-react";
import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react";
import React, { FunctionComponent }  from "react";

interface SideNavProps {
  expanded: boolean;
}

const SiSideNav: FunctionComponent<SideNavProps> = (props) => {
  const { expanded } = props;



  return (
    <SideNav aria-label="Side navigation"  expanded={expanded}>
      <SideNavItems>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
          Link
        </SideNavLink>
        <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
          Link
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};

export default SiSideNav;
