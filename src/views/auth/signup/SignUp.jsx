import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import Register from '../../../components/auth/Register'

import { CopyToClipboard } from 'react-copy-to-clipboard';

// import AuthLogin from './JWTLogin';

const SignUp = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content2">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              {/*   */}
              <Register/>

              {/* <AuthLogin /> */}
              <p className="mb-2 text-muted">
              Already have an account?{' '}
                <NavLink to="/login" className="f-w-400">
                  SingIn
                </NavLink>
              </p>
              {/* <p className="mb-0 text-muted">
                Don’t have an account?{' '}
                <NavLink to="/register" className="f-w-400">
                  Signup
                </NavLink>
              </p> */}
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
    </React.Fragment>
  );
};

export default SignUp;
