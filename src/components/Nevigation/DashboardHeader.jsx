import React, { useState } from "react";
import { Navbar, Nav, Offcanvas, Button, Container, Dropdown } from "react-bootstrap";
import {
  FaBars,
  FaHome,
  FaUser,
  FaCode,
  FaList,
  FaSignOutAlt,
  FaUserCircle,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/auth/authActions";
import "../assets/css/index.css";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [compact, setCompact] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleCompact = () => setCompact(!compact);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const menuItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/client", icon: <FaList />, label: "Customer List" },
  ];

  if (user?.role === "admin" || user?.role === "superadmin") {
    menuItems.push(
      { path: "/clientform", icon: <FaUser />, label: "Add Customer" },
      { path: "/customfield", icon: <MdAddCircleOutline />, label: "Custom Form" },
      { path: "/generateCode", icon: <FaCode />, label: "Generate Code" }
    );
  }

  return (
    <div className="d-flex">
      {/* Responsive Navbar (Small Screens) */}
      <nav className="d-lg-none top-navbar">
        <Button variant="outline-light" onClick={handleShowOffcanvas}>
          <FaBars />
        </Button>
        <span className="navbar-brand">Dashboard</span>
      </nav>

      {/* Sidebar (Large Screens) */}
      <div className={`sidebar ${compact ? "compact" : ""} d-none d-lg-flex`}>
        <Nav className="flex-column">
          {menuItems.map(({ path, icon, label }) => (
            <Nav.Link key={path} as={Link} to={path} className={location.pathname === path ? "active" : ""}>
              {icon} {!compact && label}
            </Nav.Link>
          ))}
          <Nav.Link onClick={handleLogout}>
            <FaSignOutAlt /> {!compact && "Logout"}
          </Nav.Link>
        </Nav>
      </div>

      {/* Offcanvas Sidebar (Small Screens) */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} className="sidebar-offcanvas d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {menuItems.map(({ path, icon, label }) => (
              <Nav.Link key={path} as={Link} to={path} className={location.pathname === path ? "active" : ""}>
                {icon} {label}
              </Nav.Link>
            ))}
            <Nav.Link onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Header (Large Screens) */}
      <Navbar expand="lg" fixed="top" className="dashboard-header shadow-sm d-none d-lg-flex">
        <Container fluid>
          <Navbar.Brand className="header-title">{compact ? "D" : "Dashboard"}</Navbar.Brand>
          <Button variant="outline-light" className="compact-toggle" onClick={toggleCompact}>
            {compact ? <FaExpand /> : <FaCompress />}
          </Button>
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" className="user-dropdown">
                <FaUserCircle /> {user?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <div className={`main-content ${compact ? "compact-mode" : ""}`}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
