// import React, { useEffect, useState } from "react";
// import { Card, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTasks, createTask, updateTask, deleteTask } from "../../redux/actions/task/taskActions";
// import { fetchUser } from "../../redux/actions/auth/adminActions";
// import { toast } from "react-toastify";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const TaskManagement = () => {
//   const dispatch = useDispatch();
//   const { tasks, loading, error } = useSelector((state) => state.tasks);
//   const { users, loadingUsers } = useSelector((state) => state.user);

//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [taskData, setTaskData] = useState({
//     title: "",
//     description: "",
//     assignedTo: "",
//     deadline: "",
//   });

//   useEffect(() => {
//     dispatch(fetchTasks());
//     dispatch(fetchUser());
//   }, [dispatch]);

//   useEffect(() => {
//     setFilteredUsers(users);
//   }, [users]);

//   const handleModalClose = () => {
//     setShowModal(false);
//     setTaskData({ title: "", description: "", assignedTo: "", deadline: "" });
//   };

//   const handleModalShow = () => setShowModal(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleCreateTask = () => {
//     if (Object.values(taskData).some((val) => !val)) {
//       toast.error("All fields are required!");
//       return;
//     }
//     dispatch(createTask(taskData));
//     handleModalClose();
//   };

//   const handleDeleteTask = (taskId) => dispatch(deleteTask(taskId));

//   const handleSearch = (e) => {
//     const keyword = e.target.value.toLowerCase();
//     setSearch(keyword);
//     setFilteredUsers(users.filter((user) => user.username.toLowerCase().includes(keyword)));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending": return "#ffcccc";
//       case "InProgress": return "#fff3cd";
//       case "Completed": return "#d4edda";
//       default: return "#f8f9fa";
//     }
//   };
//   const getStatusColorBtn = (status) => {
//     switch (status) {
//       case "Pending": return "#ff3333";
//       case "InProgress": return "#fff333";
//       case "Completed": return "#40ff00";
//       default: return "#f8f9fa";
//     }
//   };

//   return (
//     <div className="mt-4">
//       <h3 className="text-center">Task Management</h3>
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" />
//         </div>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : (
//         <>
//           <Button variant="primary" onClick={handleModalShow} className="mb-3">
//             <FaPlus /> Create New Task
//           </Button>
//           <div className="d-flex flex-wrap gap-3">
//             {tasks.map((task) => (
//               <Card key={task._id} style={{ backgroundColor: getStatusColor(task.status), width: "18rem" }}>
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center">
//                   <Card.Title>{task.title}</Card.Title>
//                   {/* <Card.Text>{task.status}</Card.Text> */}
//                   <button className="border-0 btn" style={{ backgroundColor: getStatusColorBtn(task.status) }}>{task.status}</button>
//                   </div>
//                   <Card.Text>{task.description}</Card.Text>
//                   <Card.Text><strong>Assigned To:</strong> {task.assignedTo?.username}</Card.Text>
//                   <Card.Text><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</Card.Text>
//                   <Button variant="warning" size="sm" onClick={() => setTaskData(task)}>
//                     <FaEdit /> Edit
//                   </Button>{" "}
//                   <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task._id)}>
//                     <FaTrash /> Delete
//                   </Button>
//                 </Card.Body>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Task Modal */}
//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{taskData._id ? "Update Task" : "Create Task"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="title">
//               <Form.Label>Title</Form.Label>
//               <Form.Control type="text" name="title" value={taskData.title} onChange={handleChange} placeholder="Enter task title" />
//             </Form.Group>
//             <Form.Group controlId="description" className="mt-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control as="textarea" rows={3} name="description" value={taskData.description} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group controlId="assignedTo" className="mt-3">
//               <Form.Label>Assign To</Form.Label>
//               <Form.Control type="text" placeholder="Search employee..." value={search} onChange={handleSearch} />
//               <Form.Select name="assignedTo" value={taskData.assignedTo} onChange={handleChange}>
//                 <option value="">Select an employee</option>
//                 {filteredUsers.map((user) => (
//                   <option key={user._id} value={user._id}>{user.username}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             <Form.Group controlId="deadline" className="mt-3">
//               <Form.Label>Deadline</Form.Label>
//               <Form.Control type="date" name="deadline" value={taskData.deadline} onChange={handleChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>Close</Button>
//           <Button variant="primary" onClick={handleCreateTask}>{taskData._id ? "Update Task" : "Create Task"}</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default TaskManagement;



import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Spinner, Alert, Badge, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, updateTask, deleteTask } from "../../redux/actions/task/taskActions";
import { fetchUser } from "../../redux/actions/auth/adminActions";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaClock, FaSpinner, FaCheckCircle, FaUser, FaSearch, FaCalendar  } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskManagement = () => {
    const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { users, loadingUsers } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleModalClose = () => {
    setShowModal(false);
    setTaskData({ title: "", description: "", assignedTo: "", deadline: "" });
  };

  const handleModalShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateTask = () => {
    if (Object.values(taskData).some((val) => !val)) {
      toast.error("All fields are required!");
      return;
    }
    dispatch(createTask(taskData));
    handleModalClose();
  };

  const handleDeleteTask = (taskId) => dispatch(deleteTask(taskId));

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFilteredUsers(users.filter((user) => user.username.toLowerCase().includes(keyword)));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#ffcccc";
      case "InProgress": return "#fff3cd";
      case "Completed": return "#d4edda";
      default: return "#f8f9fa";
    }
  };
  const getStatusColorBtn = (status) => {
    switch (status) {
      case "Pending": return "#ff3333";
      case "InProgress": return "#fff333";
      case "Completed": return "#40ff00";
      default: return "#f8f9fa";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Pending": return "danger";
      case "InProgress": return "warning";
      case "Completed": return "success";
      default: return "secondary";
    }
  };

  const statusIcons = {
    Pending: <FaClock className="me-2" />,
    InProgress: <FaSpinner className="me-2 spin-icon" />,
    Completed: <FaCheckCircle className="me-2" />
  };

  return (
    <div className="mt-4 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 text-primary fw-bold border-bottom pb-2">Task Dashboard</h3>
        <Button 
          variant="primary" 
          onClick={handleModalShow} 
          className="d-flex align-items-center shadow-sm"
        >
          <FaPlus className="me-2" /> Create Task
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" className="me-2" />
          <span className="text-muted">Loading tasks...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          {error}
        </Alert>
      ) : (
        <div className="row g-4">
          {tasks.map((task) => (
            <motion.div 
              key={task._id}
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="h-100 shadow-sm hover-shadow-lg transition-all"
                style={{ borderLeft: `4px solid var(--bs-${getStatusVariant(task.status)})` }}
              >
                <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                  <h5 className="mb-0 text-truncate">{task.title}</h5>
                  <Badge 
                    pill 
                    bg={getStatusVariant(task.status)}
                    className="d-flex align-items-center"
                  >
                    {statusIcons[task.status]}
                    {task.status}
                  </Badge>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="text-muted">{task.description}</Card.Text>
                  <div className="task-meta mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <FaUser className="me-2 text-muted" />
                      <span className="small">{task.assignedTo?.username || "Unassigned"}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaCalendar className="me-2 text-muted" />
                      <span className="small">
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ButtonGroup className="w-100">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => setTaskData(task)}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <FaEdit className="me-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteTask(task._id)}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <FaTrash className="me-1" /> Delete
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Task Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="h5">
            {taskData._id ? "Update Task" : "New Task Creation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-grid gap-3">
            <Form.Group controlId="title">
              <Form.Label className="small text-muted mb-1">Task Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                value={taskData.title} 
                onChange={handleChange} 
                placeholder="Enter task title"
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="small text-muted mb-1">Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description" 
                value={taskData.description} 
                onChange={handleChange} 
                placeholder="Task details..."
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group controlId="assignedTo">
              <Form.Label className="small text-muted mb-1">Assign To</Form.Label>
              <div className="search-container position-relative">
                <FaSearch className="position-absolute top-50 start-3 translate-middle-y text-muted" />
                <Form.Control 
                  type="text" 
                  placeholder="Search employee..." 
                  value={search} 
                  onChange={handleSearch}
                  className="ps-5 rounded-pill"
                />
              </div>
              <Form.Select 
                name="assignedTo" 
                value={taskData.assignedTo} 
                onChange={handleChange}
                className="mt-2 rounded-pill"
              >
                <option value="">Select Team Member</option>
                {filteredUsers?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="deadline">
              <Form.Label className="small text-muted mb-1">Deadline</Form.Label>
              <Form.Control 
                type="date" 
                name="deadline" 
                value={taskData.deadline} 
                onChange={handleChange} 
                className="rounded-pill"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="light" onClick={handleModalClose}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleCreateTask}
            className="px-4 rounded-pill"
          >
            {taskData._id ? "Update Task" : "Create Task"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskManagement;