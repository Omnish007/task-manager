import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import { getTasks, addTask, updateTask, deleteTask } from "./services/api";
import { auth, provider, signInWithPopup } from "./services/firebase";
import { TaskStatus, getColumnTitle } from "./config/taskConfig";
import useDragAndDrop from "./hooks/useDragAndDrop";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: "", search: "" });
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      if (authUser) {
        await fetchTasks();
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const fetchTasks = async () => {
    if (user) {
      const tasks = await getTasks(user.uid);
      setTasks(tasks);
    }
  };

  const handleAddTask = async (task) => {
    if (user) {
      const newTask = await addTask(task, user.uid);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setIsModalOpen(false);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    if (user) {
      const updated = await updateTask(id, updatedTask, user.uid);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updated : task))
      );
    }
  };

  const handleDeleteTask = async (id) => {
    if (user) {
      await deleteTask(id, user.uid);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setProfileMenuOpen(false);
    });
  };

  const {
    draggingTaskId,
    dropTargetStatus,
    dropTargetIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnter,
  } = useDragAndDrop(tasks, handleUpdateTask);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filter.status ? task.status === filter.status : true;
    const searchMatch =
      task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.search.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-b-lg mb-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Task Manager
        </h1>
        {user && (
          <div className="relative flex items-center">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
              />
              <span className="hidden md:block text-lg font-semibold">
                {user.displayName}
              </span>
            </button>
            {profileMenuOpen && (
              <div className="absolute top-14 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      {user ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
            <TaskFilter filter={filter} setFilter={setFilter} />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {Object.values(TaskStatus).map((status) => (
              <div
                key={status}
                className={`flex-1 bg-white border border-gray-300 rounded-lg p-6 min-h-[650px] relative shadow-md ${
                  dropTargetStatus === status ? "bg-gray-200" : ""
                }`}
                onDragOver={(event) => handleDragOver(event, status)}
                onDragLeave={() => handleDragLeave()}
                onDrop={(event) => handleDrop(event, status, dropTargetIndex)}
              >
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  {getColumnTitle(status)}
                </h2>
                {draggingTaskId &&
                  dropTargetStatus === status &&
                  tasks.find((task) => task._id === draggingTaskId)?.status !==
                    dropTargetStatus && (
                    <p className="text-sm text-gray-600 mb-2">
                      {`Move this task from `}
                      <span className="font-semibold">
                        {tasks.find((task) => task._id === draggingTaskId)
                          ?.status || "Unknown"}
                      </span>
                      {` to `}
                      <span className="font-semibold">{status}</span>
                      {` by dropping here`}
                    </p>
                  )}

                <TaskList
                  tasks={filteredTasks.filter((task) => task.status === status)}
                  onEdit={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragEnter={handleDragEnter}
                />
                {dropTargetIndex !== null && (
                  <div className="absolute w-full h-0.5 bg-gray-300 top-0 left-0" />
                )}
              </div>
            ))}
          </div>

          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <TaskForm onAddTask={handleAddTask} />
            </Modal>
          )}
        </>
      ) : (
        <div className="text-center w-full mt-10">
          <button
            onClick={() => signInWithPopup(auth, provider)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
