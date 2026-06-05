import { useState, useEffect } from 'react'  // ← add useEffect
import { createPortal } from 'react-dom'

function TaskModal({ onAdd, onClose }) {
  const [text, setText] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleAdd = () => {
    if (!text.trim()) return
    onAdd(text)
    setText('')
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add new task
        </h2>

        <input
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAdd}
          >
            Add task
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default TaskModal