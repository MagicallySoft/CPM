// import React, { useEffect } from "react";
// import { Card, Button, Spinner, Alert, Container, Accordion } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserTasks, updateTaskStatus } from "../../redux/actions/task/taskUserActions";
// import { FaCheckCircle, FaPlayCircle, FaPauseCircle } from "react-icons/fa";  // Icon imports

// const UserTasks = () => {
//   const dispatch = useDispatch();
//   const { userTasks, loading, error } = useSelector((state) => state.userTasks);

//   useEffect(() => {
//     dispatch(fetchUserTasks());
//   }, [dispatch]);

//   const handleStatusUpdate = (taskId, status) => {
//     dispatch(updateTaskStatus(taskId, status));
//   };

//   // Function to return background color based on status
//   const getStatusBackgroundColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "#ffcc00";  // Yellow for Pending
//       case "InProgress":
//         return "#007bff";  // Blue for InProgress
//       case "Completed":
//         return "#28a745";  // Green for Completed
//       default:
//         return "#f8f9fa";  // Default background color
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h3 className="text-center mb-4">My Assigned Tasks..</h3>
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" />
//         </div>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : (
//         <Accordion defaultActiveKey="0" className="d-flex flex-column gap-4">
//           {Object.keys(userTasks).map((status, index) => (
//             <Card key={status} className="shadow p-3" style={{ borderColor: "transparent" }}>
//               <Card.Body>
//                 <Accordion.Item eventKey={index.toString()}>
//                   <Accordion.Header className="text-center" style={{ backgroundColor: getStatusBackgroundColor(status), color: "#fff" }}>
//                     {status}
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     {userTasks[status].length > 0 ? (
//                       userTasks[status].map((task) => (
//                         <div key={task._id} className="border-bottom py-2">
//                           <Card className="mb-3">
//                             <Card.Body>
//                               <Card.Title>{task.title}</Card.Title>
//                               <Card.Text>{task.description}</Card.Text>
//                               <Card.Text className="text-muted">
//                                 Deadline: {new Date(task.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
//                               </Card.Text>
//                               {status !== "Completed" && (
//                                 <div className="d-flex justify-content-between">
//                                   {status === "InProgress" ? (
//                                     <>
//                                       <Button
//                                         variant="success"
//                                         size="sm"
//                                         onClick={() => handleStatusUpdate(task._id, "Completed")}
//                                         className="d-flex align-items-center"
//                                       >
//                                         <FaCheckCircle className="me-2" /> Mark as Completed
//                                       </Button>
//                                       <Button
//                                         variant="secondary"
//                                         size="sm"
//                                         onClick={() => handleStatusUpdate(task._id, "Pending")}
//                                         className="d-flex align-items-center"
//                                       >
//                                         <FaPauseCircle className="me-2" /> Pause Task
//                                       </Button>
//                                     </>
//                                   ) : (
//                                     status === "Pending" && (
//                                       <Button
//                                         variant="warning"
//                                         size="sm"
//                                         onClick={() => handleStatusUpdate(task._id, "InProgress")}
//                                         className="d-flex align-items-center"
//                                       >
//                                         <FaPlayCircle className="me-2" /> Start Task
//                                       </Button>
//                                     )
//                                   )}
//                                 </div>
//                               )}
//                             </Card.Body>
//                           </Card>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-center text-muted">No tasks in this category</p>
//                     )}
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </Card.Body>
//             </Card>
//           ))}
//         </Accordion>
//       )}
//     </Container>
//   );
// };

// export default UserTasks;


import React, { useEffect } from "react";
import { Card, Button, Spinner, Alert, Container, Accordion, Badge, ProgressBar, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTasks, updateTaskStatus } from "../../redux/actions/task/taskUserActions";
import { FaCheckCircle, FaPlayCircle, FaPauseCircle, FaCalendarAlt, FaTasks, FaRegClock } from "react-icons/fa";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const statusConfig = {
  Pending: {
    variant: "warning",
    icon: <FaRegClock className="me-2" />,
    color: "#ffc107"
  },
  InProgress: {
    variant: "primary",
    icon: <FaTasks className="me-2" />,
    color: "#0d6efd"
  },
  Completed: {
    variant: "success",
    icon: <FaCheckCircle className="me-2" />,
    color: "#198754"
  }
};

const UserTasks = () => {
  const dispatch = useDispatch();
  const { userTasks, loading, error } = useSelector((state) => state.userTasks);

  useEffect(() => {
    dispatch(fetchUserTasks());
  }, [dispatch]);

  const handleStatusUpdate = (taskId, status) => {
    dispatch(updateTaskStatus(taskId, status));
  };

  const getDeadlineStatus = (deadline) => {
    const now = dayjs();
    const taskDate = dayjs(deadline);
    const diffHours = taskDate.diff(now, 'hour');
    
    if (taskDate.isBefore(now)) return { variant: "danger", text: "Overdue" };
    if (diffHours < 24) return { variant: "warning", text: "Due soon" };
    return { variant: "secondary", text: "Upcoming" };
  };

  return (
    <Container className="my-4">
      <h3 className="text-center mb-4 fw-bold text-primary">
        <FaTasks className="me-2" /> My Task Dashboard
      </h3>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="grow" variant="primary" />
          <p className="text-muted mt-3">Loading your tasks...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="d-flex align-items-center">
          <FaTasks className="me-2" />
          {error}
        </Alert>
      ) : (
        <Accordion defaultActiveKey={Object.keys(userTasks)[0]} alwaysOpen>
          {Object.keys(userTasks).map((status, index) => (
            <motion.div 
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Accordion.Item eventKey={status} className="mb-3 shadow-sm">
                <Accordion.Header className="p-3">
                  <div className="d-flex align-items-center w-100">
                    {statusConfig[status].icon}
                    <span className="fw-bold me-2">{status}</span>
                    <Badge pill bg={statusConfig[status].variant} className="ms-2">
                      {userTasks[status].length}
                    </Badge>
                    <div className="ms-auto" style={{ width: '120px' }}>
                      <ProgressBar 
                        now={status === 'Completed' ? 100 : status === 'InProgress' ? 50 : 0}
                        variant={statusConfig[status].variant}
                        animated={status === 'InProgress'}
                      />
                    </div>
                  </div>
                </Accordion.Header>

                <Accordion.Body className="p-3 bg-light">
                  <div className="row g-3">
                    {userTasks[status].length > 0 ? (
                      userTasks[status].map((task) => (
                        <div key={task._id} className="col-12 col-md-6 col-lg-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Card className="h-100 shadow-sm border-start-3" 
                              style={{ borderLeftColor: statusConfig[status].color }}>
                              <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                  <Badge bg={getDeadlineStatus(task.deadline).variant} className="me-2">
                                    {getDeadlineStatus(task.deadline).text}
                                  </Badge>
                                  <small className="text-muted ms-auto">
                                    <FaCalendarAlt className="me-1" />
                                    {dayjs(task.deadline).fromNow()}
                                  </small>
                                </div>

                                <Card.Title className="h6 mb-3">{task.title}</Card.Title>
                                <Card.Text className="small text-muted mb-4">
                                  {task.description}
                                </Card.Text>

                                {status !== "Completed" && (
                                  <ButtonGroup className="w-100">
                                    {status === "InProgress" ? (
                                      <>
                                        <Button
                                          variant="outline-success"
                                          size="sm"
                                          onClick={() => handleStatusUpdate(task._id, "Completed")}
                                        >
                                          <FaCheckCircle className="me-2" /> Complete
                                        </Button>
                                        <Button
                                          variant="outline-secondary"
                                          size="sm"
                                          onClick={() => handleStatusUpdate(task._id, "Pending")}
                                        >
                                          <FaPauseCircle className="me-2" /> Pause
                                        </Button>
                                      </>
                                    ) : (
                                      <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => handleStatusUpdate(task._id, "InProgress")}
                                        className="w-100"
                                      >
                                        <FaPlayCircle className="me-2" /> Start Task
                                      </Button>
                                    )}
                                  </ButtonGroup>
                                )}
                              </Card.Body>
                            </Card>
                          </motion.div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center py-4">
                        <FaRegClock className="display-5 text-muted mb-3" />
                        <p className="text-muted">No tasks in this category</p>
                      </div>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion>
      )}
    </Container>
  );
};

export default UserTasks;