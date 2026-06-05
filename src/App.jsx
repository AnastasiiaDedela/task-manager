import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskList from "./components/TaskList";

const FILTERS = ['all', 'active', 'completed']

function App() {
  const {
    tasks,
    filter,
    totalCount,
    addTask,
    deleteTask,
    toggleTask,
    setFilter,
  } = useTasks()
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return
    addTask(text)
    setText('')
  }

const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="max-w-lg mx-auto mt-10">

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Task Manager
        <span className="ml-2 text-sm font-normal text-gray-400">
          {totalCount} total
        </span>
      </h1>

      {/* Add task input — we'll move this into a modal in Step 4 */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm capitalize ${
              filter === f
                ? 'bg-blue-500 text-white'        // active filter
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}   // ← named functions, no dispatch
        onDelete={deleteTask}
      />

    </div>
  )
}

export default App;
