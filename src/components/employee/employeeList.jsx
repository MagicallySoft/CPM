// import React, { useEffect } from "react";
// import { Table, Spinner, Alert, Container, Card } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUser } from "../../redux/actions/auth/adminActions";

// const UserList = () => {
//   const dispatch = useDispatch();
//   const { users, loadingUsers, error, superadminCount, adminCount, userCount } = useSelector(
//     (state) => state.user
//   );

//   useEffect(() => {
//     dispatch(fetchUser());
//   }, [dispatch]);

//   return (
//     <Container className="mt-4">
//       <Card className="shadow p-4">
//         <h3 className="text-center mb-4">User List</h3>
//         <div className="mb-3 d-flex justify-content-around">
//           <span className="fw-bold">Super Admins: {superadminCount}</span>
//           <span className="fw-bold">Admins: {adminCount}</span>
//           <span className="fw-bold">Users: {userCount}</span>
//         </div>
//         {loadingUsers ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//           </div>
//         ) : error ? (
//           <Alert variant="danger">{error}</Alert>
//         ) : (
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length > 0 ? (
//                 users.map((user, index) => (
//                   <tr key={user._id}>
//                     <td>{index + 1}</td>
//                     <td>{user.username}</td>
//                     <td>{user.email}</td>
//                     <td>{user.designation}</td>
//                     <td>{new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         )}
//       </Card>
//     </Container>
//   );
// };

// export default UserList;


import React, { useEffect } from "react";
import { Card, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/auth/adminActions";
import { FaUserShield, FaUserTie, FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const UserList = () => {
  const dispatch = useDispatch();
  const { employees, subadmins, loadingUsers, error, superadminCount, adminCount, userCount } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
    <Container className="mt-4">
      <div className=" p-4">
        <h3 className="text-center mb-4">User List</h3>
        {/* <div className="mb-3 d-flex justify-content-around">
          <span className="fw-bold text-primary">
            <FaUserShield className="me-1" /> Super Admins: {superadminCount}
          </span>
          <span className="fw-bold text-success">
            <FaUserTie className="me-1" /> Admins: {adminCount}
          </span>
          <span className="fw-bold text-warning">
            <FaUser className="me-1" /> Users: {userCount}
          </span>
        </div> */}
        {loadingUsers ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row>
            {employees.length > 0 ? (
              employees.map((user, index) => (
                <Col key={user._id} md={4} className="mb-4">
                  <Card className="shadow user-card p-3 border-0">
                    <Card.Body>
                      <Card.Title className="text-center">
                        <FaUser className="text-primary me-2" /> {user.username}
                      </Card.Title>
                      <Card.Text>
                        <p><FaEnvelope className="me-2 text-secondary" /> {user.email}</p>
                        <p><FaUserTie className="me-2 text-info" /> {user.role.designation}</p>
                        <p><FaCalendarAlt className="me-2 text-danger" /> {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center w-100">
                <Alert variant="info">No users found.</Alert>
              </div>
            )}
          </Row>
        )}
      </div>
    </Container>
    <Container className="mt-4">
      <div className=" p-4">
        <h3 className="text-center mb-4">Partner List</h3>
        
        {loadingUsers ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row>
            {subadmins.length > 0 ? (
              subadmins.map((user, index) => (
                <Col key={user._id} md={4} className="mb-4">
                  <Card className="shadow user-card p-3 border-0">
                    <Card.Body>
                      <Card.Title className="text-center">
                        <FaUser className="text-primary me-2" /> {user.username}
                      </Card.Title>
                      <Card.Text>
                        <p><FaEnvelope className="me-2 text-secondary" /> {user.email}</p>
                        {/* <p><FaUserTie className="me-2 text-info" /> {user.designation}</p> */}
                        <p><FaCalendarAlt className="me-2 text-danger" /> {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center w-100">
                <Alert variant="info">No users found.</Alert>
              </div>
            )}
          </Row>
        )}
      </div>
    </Container>
    </>
  );
};

export default UserList;


