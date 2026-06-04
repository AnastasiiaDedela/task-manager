// src/hooks/useTasks.js
import { useReducer } from "react";
import { tasksReducer, initialState } from "../reducers/tasksReducer";

export function useTasks() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return { state, dispatch };
}
