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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/auth/authActions";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/index.css";

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
    <Container className="login-container login-box">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={5} className="mx-auto">
          <div className="login-card p-4 shadow-lg rounded bg-white">
            {/* Dynamic header and subheader */}
            <h2 className="login-title text-center">
              {activeTab === "admin" ? "Admin Login" : "Staff Login"}
            </h2>
            <p className="text-center text-muted mb-4">
              You are logging in as{" "}
              {activeTab === "admin" ? "Admin" : "Staff"} user.
            </p>

            {/* Tab Header for toggling between login types */}
            <div className="login-tabs d-flex mb-4">
              <div
                className={`tab ${activeTab === "staff" ? "active" : ""}`}
                onClick={() => setActiveTab("staff")}
                style={{
                  flex: 1,
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "10px",
                  borderBottom:
                    activeTab === "staff"
                      ? "2px solid #007bff"
                      : "1px solid #ccc",
                }}
              >
                Staff
              </div>
              <div
                className={`tab ${activeTab === "admin" ? "active" : ""}`}
                onClick={() => setActiveTab("admin")}
                style={{
                  flex: 1,
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "10px",
                  borderBottom:
                    activeTab === "admin"
                      ? "2px solid #007bff"
                      : "1px solid #ccc",
                }}
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
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                  className="login-input"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                  className="login-input"
                />
                <Form.Control.Feedback type="invalid">
                  Password is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                className="login-btn login-btn-primary mt-4"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : activeTab === "admin" ? (
                  "Login as Admin"
                ) : (
                  "Login as Staff"
                )}
              </Button>
            </Form>
            <div className="mt-3">
            <Link to="/register" className="text-center">New User?</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
