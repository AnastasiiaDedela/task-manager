import { useTheme } from '../context/ThemeContext'
import { colors } from '../theme'

function TaskList({ tasks, onToggle, onDelete }) {
  const { theme } = useTheme()
  const c = colors[theme]

  if (tasks.length === 0) {
    return <p className={`mt-4 ${c.textMuted}`}>No tasks here!</p>
  }

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task, index) => (
        <li
          key={task.id}
          className={`flex items-center justify-between ${c.surface} p-3 rounded shadow-sm`}
        >
          <span
            className={`cursor-pointer select-none ${
              task.done
                ? 'line-through text-gray-400'  
                : c.text                  
            }`}
            onClick={() => onToggle(task.id)}
          >
            {index + 1}. {task.text}
          </span>

          <button
            className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList