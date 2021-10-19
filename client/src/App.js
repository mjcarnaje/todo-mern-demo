import "./App.css";
import { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, updateTask } from "./services/tasks";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const addTodo = async (e) => {
    e.preventDefault();
    const _todos = [...todos];
    const { data } = await addTask({ title: text });
    _todos.push(data);
    setTodos(_todos);
    setText("");
  };

  const deleteTodo = async (taskId) => {
    const _todos = [...todos];
    const filteredTasks = _todos.filter((task) => task._id !== taskId);
    await deleteTask(taskId);
    setTodos(filteredTasks);
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    const _todos = [...todos];
    const idx = _todos.findIndex((task) => task._id === currentTask._id);
    _todos[idx] = { ..._todos[idx] };
    _todos[idx].title = text;
    await updateTask({ ...currentTask, title: text });
    setTodos(_todos);
    setCurrentTask(null);
    setText("");
  };

  const enterUpdateMode = (task) => {
    setCurrentTask(task);
    setText(task.title);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTasks();
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

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
            required
          />
          <button type="submit">{currentTask ? "Update" : "Add todo"}</button>
          {currentTask && (
            <button type="button" onClick={() => setCurrentTask(null)}>
              Cancel
            </button>
          )}
        </form>
        <div className="text-center">
          <ul className="tasks-container">
            {todos.map((todo) => {
              if (currentTask && todo._id === currentTask._id) return null;

              return (
                <li key={todo._id} className="task">
                  <input
                    type="checkbox"
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p className="task-text">{todo.title}</p>
                  <div className="button-container">
                    <button
                      className="task-button"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      ❌
                    </button>
                    <button
                      className="task-button"
                      onClick={() => enterUpdateMode(todo)}
                    >
                      🖊️
                    </button>
                  </div>
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
