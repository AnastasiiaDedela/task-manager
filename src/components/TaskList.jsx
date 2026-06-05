function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li className="text-blue-500" key={task.id}>
          <span
            className={`cursor-pointer ${
              task.done ? "line-through text-gray-400" : "text-blue-500"
            }`}
            onClick={() => onToggle(task.id)}
          >
            Task {index + 1} : {task.text}
          </span>

          <button
            className="p-1 m-2 bg-red-500 text-white rounded"
            onClick={() => onToggle(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
