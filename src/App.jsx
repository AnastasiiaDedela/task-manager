import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskList from "./components/TaskList";

function App() {
  const { state, dispatch } = useTasks();
  const [text, setText] = useState("");

  const addTask = () => {
    if (!text.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: text,
    });

    setText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tasks: {state.tasks.length}</h1>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <TaskList state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
