// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTasks, updateTaskStatus, deleteTask } from "../../redux/actions/task/taskActions";
// import { Button, Card } from "@/components/ui";
// import { format } from "date-fns";

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const { tasks, loading, error } = useSelector((state) => state.tasks);
//   const userRole = useSelector((state) => state.auth.user?.role);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const handleStatusUpdate = (taskId, status) => {
//     dispatch(updateTaskStatus(taskId, status));
//   };

//   const handleDelete = (taskId) => {
//     dispatch(deleteTask(taskId));
//   };

//   if (loading) return <p>Loading tasks...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="grid gap-4 p-4">
//       {tasks.map((task) => (
//         <Card key={task._id} className="p-4 shadow-md">
//           <h2 className="text-xl font-bold">{task.title}</h2>
//           <p>{task.description}</p>
//           <p className="text-sm text-gray-500">
//             Deadline: {format(new Date(task.deadline), "PPP p")}
//           </p>
//           <p className={`text-${task.status === 'Completed' ? 'green' : 'yellow'}-500`}>
//             Status: {task.status}
//           </p>
//           {userRole === "admin" && (
//             <Button variant="destructive" onClick={() => handleDelete(task._id)}>
//               Delete Task
//             </Button>
//           )}
//           {userRole === "user" && task.status !== "Completed" && (
//             <div className="mt-2 flex gap-2">
//               <Button onClick={() => handleStatusUpdate(task._id, "In Progress")}>
//                 Mark In Progress
//               </Button>
//               <Button onClick={() => handleStatusUpdate(task._id, "Completed")}>
//                 Mark Completed
//               </Button>
//             </div>
//           )}
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default TaskList;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks,  deleteTask } from "../../redux/actions/task/taskActions";
import { format } from "date-fns";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const userRole = useSelector((state) => state.auth.user?.role);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleStatusUpdate = (taskId, status) => {
    dispatch(updateTaskStatus(taskId, status));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {tasks.map((task) => (
          <div key={task._id} className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm">
              <h2 className="card-title">{task.title}</h2>
              <p className="card-text">{task.description}</p>
              <p className="card-text text-muted">
                Deadline: {format(new Date(task.deadline), "PPP p")}
              </p>
              <p className={`text-${task.status === "Completed" ? "success" : "warning"}-500`}>
                Status: {task.status}
              </p>
              {userRole === "admin" && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete Task
                </button>
              )}
              {userRole === "user" && task.status !== "Completed" && (
                <div className="mt-2">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleStatusUpdate(task._id, "In Progress")}
                  >
                    Mark In Progress
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleStatusUpdate(task._id, "Completed")}
                  >
                    Mark Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
