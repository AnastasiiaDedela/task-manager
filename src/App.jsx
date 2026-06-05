import { lazy, Suspense, useState } from 'react'
import { useTasks } from './hooks/useTasks'
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

  const [page, setPage] = useState('dashboard')

  return (
    <div className="max-w-lg mx-auto mt-10">

      <nav className="flex gap-2 mb-8">
        <button
          onMouseEnter={() => import('./pages/Stats')}
          onClick={() => setPage('dashboard')}
          className={`px-4 py-2 rounded text-sm ${
            page === 'dashboard'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Dashboard
        </button>

        <button
          onMouseEnter={() => import('./pages/Dashboard')}
          onClick={() => setPage('stats')}
          className={`px-4 py-2 rounded text-sm ${
            page === 'stats'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Stats
        </button>
      </nav>

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
  )
}

export default App