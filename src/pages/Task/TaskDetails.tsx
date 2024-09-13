import useTaskStore from "@/store/task.store";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Recursive component to display subtasks and their nested subtasks
const SubtaskList = ({ subtasks }: { subtasks: Task[] }) => {
  return (
    <ul className="list-disc list-inside ml-5">
      {subtasks.map((subtask) => (
        <li key={subtask.id} className="mb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{subtask.title}</p>
              <p className="text-sm text-gray-600">{subtask.description}</p>
            </div>
            <div className="text-right">
              <p>
                <strong>Status:</strong> {subtask.status}
              </p>
              <p>
                <strong>Priority:</strong> {subtask.priority}
              </p>
            </div>
          </div>

          {/* Check if the subtask has nested subtasks */}
          {subtask.subtasks && subtask.subtasks.length > 0 && (
            <SubtaskList subtasks={subtask.subtasks} />
          )}
        </li>
      ))}
    </ul>
  );
};

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const { tasks } = useTaskStore();

  // Helper function to find the task or subtask by id recursively
  const findTaskById = (tasks: Task[], id: number): Task | null => {
    for (let task of tasks) {
      if (task.id === id) return task; // Found task
      if (task.subtasks && task.subtasks.length > 0) {
        const foundSubtask = findTaskById(task.subtasks, id); // Check subtasks
        if (foundSubtask) return foundSubtask; // Found subtask
      }
    }
    return null; // Not found
  };

  useEffect(() => {
    if (id && Array.isArray(tasks)) {
      // Ensure tasks is an array
      const taskId = parseInt(id);
      const foundTask = findTaskById(tasks, taskId);
      setTask(foundTask);
    }
  }, [id, tasks]);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="flex-1 h-[calc(100dvh - 60px)] bg-white m-3 rounded-lg p-5">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-lg">{task.description}</p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Estimate:</strong> {task.estimate}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags.join(", ")}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(task.createdAt).toLocaleDateString()}
      </p>

      {/* Subtasks Section */}
      {task.subtasks && task.subtasks.length > 0 ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-3">Subtasks:</h2>
          <SubtaskList subtasks={task.subtasks} />
        </div>
      ) : (
        <p className="mt-5 text-gray-500">No subtasks available</p>
      )}
    </div>
  );
};

export default TaskDetails;
