import { lazy, Suspense, useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './context/ThemeContext'
import { colors } from './theme'
import ErrorBoundary from './components/ErrorBoundary'
import Spinner from './components/Spinner'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Stats = lazy(() => import('./pages/Stats'))

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

  const { theme, toggleTheme } = useTheme()

  const c = colors[theme]

  const [page, setPage] = useState('dashboard')

  return (

    <div className={`min-h-screen ${c.bg} transition-colors duration-300`}>


      <div className="max-w-lg mx-auto pt-10 px-4">

        <div className="flex items-center justify-between mb-8">

          <nav className="flex gap-2">
            <button
              onMouseEnter={() => import('./pages/Dashboard')}
              onClick={() => setPage('dashboard')}
              className={`px-4 py-2 rounded text-sm ${
                page === 'dashboard' ? c.navActive : c.navInactive
              }`}
            >
              Dashboard
            </button>
            <button
              onMouseEnter={() => import('./pages/Stats')}
              onClick={() => setPage('stats')}
              className={`px-4 py-2 rounded text-sm ${
                page === 'stats' ? c.navActive : c.navInactive
              }`}
            >
              Stats
            </button>
          </nav>


          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded text-sm ${c.navInactive}`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

        </div>

        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            {page === 'dashboard' && (
              <Dashboard
                tasks={tasks}
                filter={filter}
                totalCount={totalCount}
                addTask={addTask}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                setFilter={setFilter}
              />
            )}
            {page === 'stats' && (
              <Stats
                tasks={tasks}
                totalCount={totalCount}
              />
            )}
          </Suspense>
        </ErrorBoundary>

      </div>
    </div>
  )
}

export default App