import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCode_ } from "../../redux/actions/codeActions";
import {
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/index.css";

const GenerateCode = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { loading, code, error } = useSelector((state) => state.codes);

  const [username, setUsername] = useState("");
  const [designation, setDesignation] = useState("");
  // This selector is used only by admins to choose between "Partner" (subadmin) or "Employee"
  const [codeType, setCodeType] = useState("subadmin");
  // Expiry date is optional (if provided, it must be a valid date)
  const [expiryDate, setExpiryDate] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Only allow admins to generate codes. Others see an unauthorized message.
  if (user?.role !== "admin") {
    return (
      <Container className="generate-code-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <Card className="generate-card text-center">
              <Card.Body>
                <h2 className="generate-title">Unauthorized</h2>
                <p>You are not authorized to generate registration codes.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleGenerateCode = () => {
    if (!username.trim()) {
      alert("Please enter a username.");
      return;
    }
    if (codeType === "employee" && !designation.trim()) {
      alert("Please provide designation for Employee.");
      return;
    }

    // Build the payload.
    // The backend uses the presence of "designation" to determine the code type.
    const payload = { username: username.trim() };
    if (codeType === "employee") {
      payload.designation = designation.trim();
    }
    if (expiryDate) {
      payload.expiryDate = expiryDate;
    }

    dispatch(generateCode_(payload));
  };

  return (
    <Container className="generate-code-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="generate-card">
            <Card.Body>
              <h2 className="generate-title">Generate Registration Code</h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    className="generate-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Generate Code For?</Form.Label>
                  <Form.Control
                    as="select"
                    value={codeType}
                    onChange={(e) => setCodeType(e.target.value)}
                    className="generate-input"
                  >
                    <option value="subadmin">Partner</option>
                    <option value="employee">Employee</option>
                  </Form.Control>
                </Form.Group>
                {codeType === "employee" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Enter Designation</Form.Label>
                    <Form.Control
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Enter Designation"
                      className="generate-input"
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Set Expiry Date (Optional)</Form.Label>
                  <Form.Control
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="generate-input"
                  />
                </Form.Group>
                <Button
                  className="generate-btn generate-btn-primary"
                  onClick={handleGenerateCode}
                  disabled={loading}
                  type="button"
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Generate Code"}
                </Button>
              </Form>
              {code && (
                <InputGroup className="mt-3">
                  <Form.Control value={code} readOnly />
                  <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                    <Button className="copy-btn">📋</Button>
                  </CopyToClipboard>
                </InputGroup>
              )}
              {copied && <p className="copied-message">Copied!</p>}
              {error && <p className="error-message">{error}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GenerateCode;
