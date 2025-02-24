// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/auth/authActions";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/index.css";
import logoIcon from '../../assets/image/logo/logo_icon.png'

const Login = () => {
  // Track active login type: "staff" or "admin"
  const [activeTab, setActiveTab] = useState("staff");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get loading and error state from Redux
  const { loading, error } = useSelector((state) => state.auth) || {
    loading: false,
    error: null,
  };

  // Display session expiration message if applicable
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("sessionExpired") === "true") {
      toast.error("Session expired. Please log in again.");
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    setValidated(true);

    // Add the isAdmin flag based on the active tab
    const credentials = { ...formData, isAdmin: activeTab === "admin" };
    dispatch(loginUser(credentials, navigate));
  };

  return (
    // <Container className="login-container login-box">
    //   <ToastContainer position="top-right" autoClose={3000} />
    //   <Row className="w-100 justify-content-center">
    //     <Col xs={12} md={8} lg={5} className="mx-auto d-flex justify-content-center">
    //       <div className="login-card shadow rounded bg-white">
    <>
      {/* Dynamic header and subheader */}
      <Image src={logoIcon} alt="Description" width={60} height={60} />
      <h2 className="login-title text-center responsive-heading text-cstm d-flex flex-wrap align-items-center justify-content-center">
        <i className="feather icon-unlock auth-icon mx-2" />
        {activeTab === "admin" ? "Admin SignIn" : "Staff SignIn"}
      </h2>
      {/* <p className="text-center text-muted responsive-text mb-4">
        You are logging in as {activeTab === "admin" ? "Admin" : "Staff"} user.
      </p> */}

      {/* Tab Header for toggling between login types */}
      <div className="login-tabs">
        <div
          className={`tab responsive-text ${activeTab === "staff" ? "active" : ""}`}
          onClick={() => setActiveTab("staff")}
        >
          Staff
        </div>
        <div
          className={`tab responsive-text ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="login-alert">
          {error}
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="text-start">
          <Form.Label className="responsive-text">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
            className="login-input responsive-input"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password" className="mt-3 text-start">
          <Form.Label className="responsive-text">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            required
            className="login-input responsive-input"
          />
          <Form.Control.Feedback type="invalid">
            Password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <span className="text-end">
        {/* <NavLink to={'#'} >
          Forgot password?
        </NavLink> */}
        </span>
        <Button
          type="submit"
          className="login-btn login-btn-primary mt-4 responsive-btn"
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : activeTab === "admin" ? (
            "SignIn as Admin"
          ) : (
            "SignIn as Staff"
          )}
        </Button>

      </Form>
      {/* <div className="mt-3 text-center responsive-text">
              <Link to="/register">New User?</Link>
            </div> */}
      {/* </div>
        </Col>
      </Row>
    </Container> */}
    </>
  );
};

export default Login;
