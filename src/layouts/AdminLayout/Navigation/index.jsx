import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { ConfigContext } from '../../../contexts/ConfigContext.jsx';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
import navigation from '../../../menu-items';

const Navigation = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const windowSize = useWindowSize();

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const filterNavigation = (items) =>
    items
      .filter((item) => !item.allowedRoles || item.allowedRoles.includes(user?.role))
      .map((item) => ({
        ...item,
        children: item.children ? filterNavigation(item.children) : undefined
      }));

  const filteredNavigation = filterNavigation(navigation.items);

  let navClass = ['pcoded-navbar'];

  navClass = [...navClass];

  if (windowSize.width < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }

  let navBarClass = ['navbar-wrapper'];

  let navContent = (
    <div className={navBarClass.join(' ')}>
      <NavLogo />
      <NavContent navigation={filteredNavigation} />
    </div>
  );
  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={filteredNavigation} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <nav className={navClass.join(' ')}>{navContent}</nav>
    </React.Fragment>
  );
};

export default Navigation;
