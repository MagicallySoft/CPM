import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import RegisterAdmin from "./registerForm/RegisterAdmin";
import RegisterStaff from "./registerForm/RegisterStaff";
import "../../assets/css/register.css";
import logoIcon from '../../assets/image/logo/logo_icon.png'

const Register = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <>
      {/* <Container fluid className="d-flex align-items-center justify-content-center register-container "> */}
      {/* <Row className="justify-content-center w-100"> */}
      {/* <Col xs={12} sm={10} md={8} lg={5}> */}
      {/* <div className="register-card shadow rounded">   */}
      {/* Tab Header */}
      <Image src={logoIcon} alt="Description" width={60} height={60} />
      <h2 className="login-title text-center responsive-heading text-cstm d-flex flex-wrap align-items-center justify-content-center">
      <i className="feather icon-user-plus auth-icon mx-1" />{activeTab === "company" ? "Admin SignUp" : "Staff SignUp"}
      </h2>
      <div className="register-tabs">
        <div
          className={`tab responsive-text ${activeTab === "company" ? "active" : ""}`}
          onClick={() => setActiveTab("company")}
        >
          Company
        </div>
        <div
          className={`tab responsive-text ${activeTab === "staff" ? "active" : ""}`}
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
        {activeTab === "company" ? (
          <RegisterAdmin />
        ) : (
          <RegisterStaff />
        )}
      </div>
      {/* </div>   */}
      {/* </Col> */}
      {/* </Row> */}
      {/* </Container> */}
    </>
  );
};

export default Register;
