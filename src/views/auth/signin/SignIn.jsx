import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import Login from '../../../components/auth/Login'

import { CopyToClipboard } from 'react-copy-to-clipboard';

// import AuthLogin from './JWTLogin';

const SignIn = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              {/*   */}
              <Login />

              {/* <AuthLogin /> */}
              <p className="mb-2 text-muted">
                Forgot password?{' '}
                <NavLink to={'#'} className="f-w-400">
                  Reset
                </NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account?{' '}
                <NavLink to="/register" className="f-w-400">
                  Signup
                </NavLink>
              </p>

              {/* <Alert variant="primary" className="text-start mt-3">
                User:
                <CopyToClipboard text="info@codedthemes.com">
                  <Button variant="outline-primary" as={Link} to="#" className="badge mx-2 mb-2" size="sm">
                    <i className="fa fa-user" /> info@codedthemes.com
                  </Button>
                </CopyToClipboard>
                <br />
                Password:
                <CopyToClipboard text="123456">
                  <Button variant="outline-primary" as={Link} to="#" className="badge mx-2" size="sm">
                    <i className="fa fa-lock" /> 123456
                  </Button>
                </CopyToClipboard>
              </Alert> */}
            </Card.Body>


          </Card>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        {/* Other content here */}
        {/* <span
          style={{ position: 'absolute', right: 20, bottom: 10 }}
          className="d-flex flex-wrap justify-content-center align-items-center mb-1"
        >
          powered by&nbsp;
          <a href="https://magicallysoft.com/" className="m-0 text-cstm text-decoration-none fw-bold">
            MagcallySoft
          </a>
        </span> */}
      </div>

    </React.Fragment>
  );
};

export default SignIn;
