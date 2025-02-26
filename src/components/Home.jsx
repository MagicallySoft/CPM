import React, { useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserCounts } from "../redux/actions/auth/adminActions";
import { setUserFromLocalStorage } from "../redux/actions/auth/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/index.css";

const Home = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { superadminCount, adminCount, subadminCount, userCount, loadingUsers, error } = useSelector((state) => state.user);
  // console.log(superadminCount, adminCount, subadminCount, userCount);
  
  useEffect(() => {
    if (!user && localStorage.getItem("userData")) {
      dispatch(setUserFromLocalStorage());
    }
    if (user?.role === "superadmin") {
      dispatch(fetchUserCounts());
    }
  }, [dispatch, user]);



  if (loading || loadingUsers) {
    return (
      <Container className="loading-container">
        <Row>
          <Col xs={12} className="text-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="loading-container">
        <Row>
          <Col xs={12} className="alert-box">
            <Alert variant="warning">You must be logged in to view the home page.</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="home-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <Row className="mt-4">
          <Col xs={12}>
            <h2 className="text-center">Welcome, {user.name}!</h2>
          </Col>
        </Row>

        {user.role === "superadmin" && (
          <Row className="mt-4">
            <Col md={6} className="p-1">
              <Card className="dashboard-card">
                <Card.Body>
                  <Card.Title>Total Super Admins</Card.Title>
                  <h3>{superadminCount}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="p-1">
              <Card className="dashboard-card">
                <Card.Body>
                  <Card.Title>Total Admins</Card.Title>
                  <h3>{adminCount}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="p-1">
              <Card className="dashboard-card">
                <Card.Body>
                  <Card.Title>Total Employee</Card.Title>
                  <h3>{userCount}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="p-1">
              <Card className="dashboard-card">
                <Card.Body>
                  <Card.Title>Total Partner</Card.Title>
                  <h3>{subadminCount}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default Home;
