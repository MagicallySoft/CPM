import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RegisterAdmin from "./registerForm/RegisterAdmin";
import RegisterStaff from "./registerForm/RegisterStaff";
import "../../assets/css/register.css";

const Register = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center register-container vh-100"
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={5}>
          <div className="register-card p-4 shadow-lg rounded bg-white">
            {/* <h2 className="text-center mb-4">Create Account</h2> */}
            {/* Tab Header */}
            <div className="register-tabs">
              <div
                className={`tab ${activeTab === "company" ? "active" : ""}`}
                onClick={() => setActiveTab("company")}
              >
                Company
              </div>
              <div
                className={`tab ${activeTab === "staff" ? "active" : ""}`}
                onClick={() => setActiveTab("staff")}
              >
                Staff
              </div>
              <div
                className="active-indicator"
                style={{
                  transform: `translateX(${activeTab === "company" ? "0%" : "100%"})`,
                }}
              />
            </div>
            {/* Form Content */}
            <div className="form-container fade-in">
              {activeTab === "company" ? <RegisterAdmin /> : <RegisterStaff />}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
