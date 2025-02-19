import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner, InputGroup } from "react-bootstrap";
import { BsEnvelope, BsPerson, BsKey } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { LiaUserSecretSolid } from "react-icons/lia";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../../redux/actions/auth/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/css/index.css";
import "../../../assets/css/register.css";

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        subscriptionPlan: "",
        paymentDetails: "",
    });
    const [validated, setValidated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
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

        dispatch(registerAdmin(formData, navigate));
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center">
            <ToastContainer />
            <Row className="w-100 justify-content-center">
                <Col xs={12}>
                    <div className="register-card p-4 shadow rounded">
                        <h2 className="text-center mb-4 text-cstm">
                            Admin Registration
                        </h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {passwordMismatch && (
                            <Alert variant="danger">Passwords do not match.</Alert>
                        )}
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label className="form-label">Full Name</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="input-icon">
                                        <BsPerson />
                                    </InputGroup.Text>
                                    <Form.Control
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

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label className="form-label">Email Address</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="input-icon">
                                        <BsEnvelope />
                                    </InputGroup.Text>
                                    <Form.Control
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
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone.
                                </Form.Text>
                            </Form.Group>

                            {/* Password Field */}
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label className="form-label">Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="input-icon">
                                        <BsKey />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter password"
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="toggle-password-btn"
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
                                <Form.Label className="form-label">Confirm Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="input-icon">
                                        <BsKey />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="toggle-password-btn"
                                    >
                                        {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        Confirm password is required.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="subscriptionPlan" className="mt-3">
                                <Form.Label>Subscription Plan</Form.Label>
                                <InputGroup>
                                <InputGroup.Text className="input-icon">
                                <HiOutlineCalendarDateRange />
                                </InputGroup.Text>
                                <Form.Control
                                    as="select"
                                    name="subscriptionPlan"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Plan</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Subscription plan is required.
                                </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="paymentDetails" className="mt-3">
                                <Form.Label>Payment Details</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="paymentDetails"
                                    placeholder="Enter payment details"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Payment details are required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit" className="login-btn login-btn-primary mt-4 w-100" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Register"}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterAdmin;
