// DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Offcanvas, Button, Container, Dropdown } from "react-bootstrap";
import { FaBars, FaHome, FaUser, FaCode, FaList, FaSignOutAlt, FaUserCircle, FaExpand, FaCompress } from "react-icons/fa";
import { MdAddCircleOutline, MdAutorenew  } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/auth/authActions";
import "../../assets/css/index.css";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  
  const [compact, setCompact] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleCompact = () => setCompact(!compact);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        handleCloseOffcanvas();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const menuItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/client", icon: <FaList />, label: "Customer List" },
    { path: "/reminder", icon: <MdAutorenew />, label: "Reminder List" },
    
  ];

  if (user?.role === "admin" || user?.role === "superadmin") {
    menuItems.push(
      { path: "/clientform", icon: <FaUser />, label: "Add Customer" },
      { path: "/customfield", icon: <MdAddCircleOutline />, label: "Custom Form" },
      { path: "/task", icon: <GoTasklist />, label: "Tasks" },
      { path: "/emlpoyeelist", icon: <BsListTask />, label: "Emlpoyee List" },
      { path: "/generateCode", icon: <FaCode />, label: "Generate Code" },
    );
  }
  if (user?.role === "user" ) {
    menuItems.push(
      { path: "/taskslist", icon: <GoTasklist />, label: "Task" },
    )
  }

  return (
    <div className="dashboard-wrapper">
      {/* Top Header - Visible on all screens */}
      <Navbar fixed="top" className="dashboard-header shadow-sm">
        <Container fluid>
          {/* Mobile Menu Button */}
          <Button variant="outline-light" className="d-lg-none" onClick={handleShowOffcanvas}>
            <FaBars />
          </Button>

          {/* Brand Title */}
          <div className="d-flex align-items-center">
          <Navbar.Brand className="header-title">
            {compact ? "D" : "Dashboard"}
          </Navbar.Brand>

            <Button variant="outline-light"  className="compact-toggle d-none d-lg-flex" onClick={toggleCompact}>
              {compact ? <FaExpand /> : <FaCompress />}
            </Button>
          </div>
          {/* Desktop Controls */}
          <div className="d-none d-lg-flex align-items-center">

            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" className="user-dropdown">
                <FaUserCircle className="user-icon" /> {user?.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Mobile User Dropdown */}
          <Dropdown align="end" className="d-lg-none">
            <Dropdown.Toggle variant="outline-light" className="user-dropdown">
              <FaUserCircle className="user-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      {/* Sidebar - Desktop */}
      <div className={`sidebar ${compact ? "compact" : ""} d-none d-lg-block`}>
        <Nav className="flex-column">
          {menuItems.map(({ path, icon, label }) => (
            <Nav.Link
              key={path}
              as={Link}
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              {icon} {!compact && <span className="nav-label">{label}</span>}
            </Nav.Link>
          ))}
          <Nav.Link onClick={handleLogout}>
            <FaSignOutAlt /> {!compact && <span className="nav-label">Logout</span>}
          </Nav.Link>
        </Nav>
      </div>

      {/* Offcanvas - Mobile */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} className="d-lg-none mobile-nav">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {menuItems.map(({ path, icon, label }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                className={location.pathname === path ? "active" : ""}
                onClick={handleCloseOffcanvas}
              >
                {icon} {label}
              </Nav.Link>
            ))}
            <Nav.Link onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div className={`main-content ${compact ? "compact-mode" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;