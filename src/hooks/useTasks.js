import { useReducer, useMemo } from 'react'
import { tasksReducer, initialState } from '../reducers/tasksReducer'

export function useTasks() {
  const data1 = useReducer(tasksReducer)
  const data2 = useReducer(initialState)

  const [state, dispatch] = useReducer(tasksReducer, initialState)

  const addTask = (text) => dispatch({ type: 'ADD_TASK', payload: text })
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id })
  const toggleTask = (id) => dispatch({ type: 'TOGGLE_TASK', payload: id })
  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter })

  const filteredTasks = useMemo(() => {
    if (state.filter === 'active')    return state.tasks.filter(t => !t.done)
    if (state.filter === 'completed') return state.tasks.filter(t => t.done)
    return state.tasks
  }, [state.tasks, state.filter])

  return {
    tasks: filteredTasks,       
    filter: state.filter,       
    totalCount: state.tasks.length,
    addTask,
    deleteTask,
    toggleTask,
    setFilter,
  }
}