import "./App.css";
import { useState } from "react";

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const addTodo = (e) => {
    e.preventDefault();
    const tasksCopy = [...tasks];
    tasksCopy.push({ id: generateId(), text: text, isCompleted: false });
    setTasks(tasksCopy);
    setText("");
  };

  const deleteTodo = (taskId) => {
    const tasksCopy = [...tasks];
    const filteredTasks = tasksCopy.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    const tasksCopy = [...tasks];
    const idx = tasksCopy.findIndex((task) => task.id === currentTask.id);
    tasksCopy[idx] = { ...tasksCopy[idx] };
    tasksCopy[idx].text = text;
    setTasks(tasksCopy);
    setCurrentTask(null);
    setText("");
  };

  const enterUpdateMode = (task) => {
    setCurrentTask(task);
    setText(task.text);
  };

  return (
    <div className="container">
      <header>
        <h1>Todo</h1>
      </header>
      <div>
        <form onSubmit={currentTask ? updateTodo : addTodo}>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
          />
          <button>{currentTask ? "Update" : "Add todo"}</button>
        </form>
        <div className="text-center">
          <ul className="tasks-container">
            {tasks.map((task) => {
              if (currentTask && task.id === currentTask.id) return null;

              return (
                <li key={task.id} className="task">
                  <p className="task-text">{task.text}</p>
                  <button
                    className="task-delete"
                    onClick={() => deleteTodo(task.id)}
                  >
                    x
                  </button>
                  <button
                    className="task"
                    onClick={() => enterUpdateMode(task)}
                  >
                    update
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
