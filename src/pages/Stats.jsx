import { useTheme } from '../context/ThemeContext'
import { colors } from '../theme'

function Stats({ tasks, totalCount }) {
  const { theme } = useTheme()
  const c = colors[theme]

  const completedCount = tasks.filter(t => t.done).length
  const activeCount = tasks.filter(t => !t.done).length
  const completedPercent = totalCount === 0
    ? 0
    : Math.round((completedCount / totalCount) * 100)

  return (
    <div>
      <h1 className={`text-2xl font-bold ${c.text} mb-6`}>Statistics</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`${c.surface} rounded-lg shadow-sm p-4 text-center`}>
          <p className={`text-3xl font-bold ${c.text}`}>{totalCount}</p>
          <p className={`text-sm ${c.textMuted} mt-1`}>Total</p>
        </div>
        <div className={`${c.surface} rounded-lg shadow-sm p-4 text-center`}>
          <p className="text-3xl font-bold text-green-500">{completedCount}</p>
          <p className={`text-sm ${c.textMuted} mt-1`}>Completed</p>
        </div>
        <div className={`${c.surface} rounded-lg shadow-sm p-4 text-center`}>
          <p className="text-3xl font-bold text-blue-500">{activeCount}</p>
          <p className={`text-sm ${c.textMuted} mt-1`}>Active</p>
        </div>
      </div>

      <div className={`${c.surface} rounded-lg shadow-sm p-4`}>
        <div className={`flex justify-between text-sm ${c.textMuted} mb-2`}>
          <span>Progress</span>
          <span>{completedPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completedPercent}%` }}
          />
        </div>
        {totalCount === 0 && (
          <p className={`text-sm ${c.textMuted} mt-3 text-center`}>
            No tasks yet!
          </p>
        )}
      </div>
    </div>
  )
}

export default Stats