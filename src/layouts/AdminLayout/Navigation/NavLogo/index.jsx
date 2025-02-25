import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConfigContext } from '../../../../contexts/ConfigContext.jsx';
import * as actionType from '../../../../store/actions';
import { Image } from "react-bootstrap";
import logoIcon from '../../../../assets/image/logo/logo_icon.png'

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="#" className="b-brand">
          {/* <div className="b-bg"> */}
          {/* <i className="feather icon-trending-up" /> */}
          {/* </i> */}
          {/* </div> */}
          <Image src={logoIcon} alt="Description" width={40} height={40} />
          <span className="b-title">CPM Dashbord</span>
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
