import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { colors } from '../theme'
import TaskList from '../components/TaskList'
import TaskModal from '../components/TaskModal'

const FILTERS = ['all', 'active', 'completed']

function Dashboard({ tasks, filter, totalCount, addTask, deleteTask, toggleTask, setFilter }) {
  const { theme } = useTheme()
  const c = colors[theme]

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${c.text}`}>
          Task Manager
          <span className={`ml-2 text-sm font-normal ${c.textMuted}`}>
            {totalCount} total
          </span>
        </h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          + Add task
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm capitalize ${
              filter === f ? c.filterActive : c.filterInactive
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      {isModalOpen && (
        <TaskModal
          onAdd={addTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Dashboard