import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerStaff } from "../../../redux/actions/auth/authActions";
import { ToastContainer } from "react-toastify";
import { BsEnvelope, BsPerson, BsKey } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosBarcode } from "react-icons/io";
import { LiaUserSecretSolid } from "react-icons/lia";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/css/index.css";
import "../../../assets/css/register.css";

const RegisterStaff = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationCode: "",
  });
  const [validated, setValidated] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    dispatch(registerStaff(formData, navigate));
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center">
      <ToastContainer />
      <div className="w-100 justify-content-center">
        <Col xs={12}>
          <div className="register-card shadow rounded">
            <h2 className="text-center mb-4 responsive-heading text-cstm">
              Staff Registration
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {passwordMismatch && (
              <Alert variant="danger">Passwords do not match.</Alert>
            )}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <Form.Group controlId="username" className="mb-3">
                <Form.Label className="form-label responsive-text">
                  Full Name
                </Form.Label>
                <InputGroup className="responsive-input-group">
                  <InputGroup.Text className="input-icon responsive-icon">
                    <BsPerson />
                  </InputGroup.Text>
                  <Form.Control
                    className="responsive-input"
                    type="text"
                    name="username"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    Username is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {/* Email Field */}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="form-label responsive-text">
                  Email Address
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon responsive-icon">
                    <BsEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    className="responsive-input"
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted responsive-text">
                  We'll never share your email with anyone.
                </Form.Text>
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="password" className="mb-3">
                <Form.Label className="form-label responsive-text">
                  Password
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon responsive-icon">
                    <BsKey />
                  </InputGroup.Text>
                  <Form.Control
                    className="responsive-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password-btn responsive-btn"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Password is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label className="form-label responsive-text">
                  Confirm Password
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon responsive-icon">
                    <BsKey />
                  </InputGroup.Text>
                  <Form.Control
                    className="responsive-input"
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="toggle-password-btn responsive-btn"
                  >
                    {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Confirm password is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {/* Registration Code Field */}
              <Form.Group controlId="registrationCode" className="mb-3">
                <Form.Label className="form-label responsive-text">
                  Registration Code
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon responsive-icon">
                    <IoIosBarcode />
                  </InputGroup.Text>
                  <Form.Control
                    className="responsive-input"
                    type="text"
                    name="registrationCode"
                    placeholder="Enter registration code"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Registration code is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button
                type="submit"
                className="login-btn login-btn-primary mt-4 w-100 responsive-btn"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Register"}
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <Link to="/login" className="responsive-text">
                Have an account?
              </Link>
            </div>
          </div>
        </Col>
      </div>
    </Container>
  );
};

export default RegisterStaff;
