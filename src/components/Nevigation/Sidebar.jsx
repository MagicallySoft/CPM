import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Nav, Offcanvas, Button } from "react-bootstrap";
import { FaBars, FaHome, FaUser, FaCode, FaList, FaSignOutAlt, FaRegAddressCard } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { logoutUser } from "../../redux/actions/authActions";
import "../assets/css/index.css";

const Sidebar = ({ compact }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    // window.location.href = "/login";
    navigate("/login");
  };

  return (
    <>
      {/* Responsive Navbar for Small Screens */}
      <nav className="d-lg-none top-navbar">
        <Button variant="outline-light" onClick={handleShow}>
          <FaBars />
        </Button>
        <span className="navbar-brand">Dashboard</span>
      </nav>

      {/* Sidebar for Large Screens */}
      <div className={`sidebar ${compact ? "compact" : ""} d-none d-lg-flex`}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
            <FaHome className="sidebar-icon" /> {!compact && "Home"}
          </Nav.Link>
          <Nav.Link as={Link} to="/client" className={location.pathname === "/client" ? "active" : ""}>
            <FaList className="sidebar-icon" /> {!compact && "Customer List"}
          </Nav.Link>
          {(user?.role === "admin" || user?.role === "superadmin") && (
            <>
              <Nav.Link as={Link} to="/clientform" className={location.pathname === "/clientform" ? "active" : ""}>
                <FaUser className="sidebar-icon" /> {!compact && "Add Customer"}
              </Nav.Link>
              <Nav.Link as={Link} to="/customfield" className={location.pathname === "/customfield" ? "active" : ""}>
                <MdAddCircleOutline className="sidebar-icon" /> {!compact && "Custom Form"}
              </Nav.Link>
              <Nav.Link as={Link} to="/generateCode" className={location.pathname === "/generateCode" ? "active" : ""}>
                <FaCode className="sidebar-icon" /> {!compact && "Generate Code"}
              </Nav.Link>
            </>
          )}
          <Nav.Link onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" /> {!compact && "Logout"}
          </Nav.Link>
        </Nav>
      </div>

      {/* Offcanvas Sidebar for Small Screens */}
      <Offcanvas show={show} onHide={handleClose} className="sidebar-offcanvas d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
              <FaHome className="me-2" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/client" className={location.pathname === "/client" ? "active" : ""}>
              <FaList className="me-2" /> Customer List
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;




// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { Navbar, Nav, Offcanvas, Button, Container } from "react-bootstrap";
// import { FaBars, FaHome, FaUser, FaCode, FaList, FaSignInAlt, FaSignOutAlt, FaRegAddressCard } from "react-icons/fa";
// import { MdAddCircleOutline } from "react-icons/md";
// import { logoutUser } from "../redux/actions/authActions";
// import "../assets/css/index.css";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const [show, setShow] = useState(false);
//   const location = useLocation(); // Get current route for active link
//   const { user } = useSelector(state => state.auth);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("userData");
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Top Navbar for Small Screens */}
//       <Navbar expand="lg" fixed="top" className="d-lg-none shadow-sm d-flex justify-content-around top-navbar">
//         <Container className="custom-navbar-container">
//           <Button variant="outline-light" onClick={handleShow}>
//             <FaBars />
//           </Button>
//           <Navbar.Brand className="navbar-brand">Dashboard</Navbar.Brand>
//         </Container>
//       </Navbar>

//       {/* Sidebar for Large Screens */}
//       <div className="d-none d-lg-flex flex-column sidebar">
//         <h4 className="text-center mb-4">Dashboard</h4>
//         <Nav className="flex-column">
//           <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
//             <FaHome className="me-2" /> Home
//           </Nav.Link>
//           <Nav.Link as={Link} to="/client" className={location.pathname === "/client" ? "active" : ""}>
//             <FaList className="me-2" /> Customer List
//           </Nav.Link>
//           {(user?.role === "admin" || user?.role === "superadmin") && (
//             <Nav.Link as={Link} to="/clientform" className={location.pathname === "/clientform" ? "active" : ""}>
//               <FaUser className="me-2" /> Add Customer
//             </Nav.Link>
//           )}
//           {(user?.role === "admin" || user?.role === "superadmin") && (
//             <Nav.Link as={Link} to="/customfield" className={location.pathname === "/customfield" ? "active" : ""}>
//               <MdAddCircleOutline className="me-2"/> Custom Form
//             </Nav.Link>
//           )}
//           {(user?.role === "admin" || user?.role === "superadmin") && (
//             <Nav.Link as={Link} to="/generateCode" className={location.pathname === "/generateCode" ? "active" : ""}>
//               <FaCode className="me-2" /> Generate Code
//             </Nav.Link>
//           )}

//           {(user?.role === "admin" || user?.role === "superadmin") && (
//             <Nav.Link as={Link} to="/addRegister" className={location.pathname === "/addRegister" ? "active" : ""}>
//               <FaRegAddressCard className="me-2" /> Register
//             </Nav.Link>
//           )}
//           <Nav.Link onClick={handleLogout}>
//             <FaSignOutAlt className="me-2" /> Logout
//           </Nav.Link>
//         </Nav>
//       </div>

//       {/* Offcanvas Sidebar for Small Screens */}
//       <Offcanvas show={show} onHide={handleClose} className="sidebar-offcanvas">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Dashboard</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Nav className="flex-column">
//             <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
//               <FaHome className="me-2" /> Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/client" className={location.pathname === "/client" ? "active" : ""}>
//               <FaList className="me-2" /> Customer List
//             </Nav.Link>
//             {(user?.role === "admin" || user?.role === "superadmin") && (
//               <Nav.Link as={Link} to="/clientform" className={location.pathname === "/clientform" ? "active" : ""}>
//                 <FaUser className="me-2" /> Add Customer
//               </Nav.Link>
//             )}
//             {(user?.role === "admin" || user?.role === "superadmin") && (
//               <Nav.Link as={Link} to="/customfield" className={location.pathname === "/customfield" ? "active" : ""}>
//                 <MdAddCircleOutline className="me-2"/> Custom Form
//               </Nav.Link>
//             )}
//             {(user?.role === "admin" || user?.role === "superadmin") && (
//               <Nav.Link as={Link} to="/generateCode" className={location.pathname === "/generateCode" ? "active" : ""}>
//                 <FaCode className="me-2" /> Generate Code
//               </Nav.Link>
//             )}
//             {(user?.role === "admin" || user?.role === "superadmin") && (
//               <Nav.Link as={Link} to="/addRegister" className={location.pathname === "/addRegister" ? "active" : ""}>
//                 <FaRegAddressCard className="me-2" /> Register
//               </Nav.Link>
//             )}
//             <Nav.Link onClick={handleLogout}>
//               <FaSignOutAlt className="me-2" /> Logout
//             </Nav.Link>
//           </Nav>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// };

// export default Sidebar;
