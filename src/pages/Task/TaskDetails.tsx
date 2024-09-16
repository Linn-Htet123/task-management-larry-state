import CopyLinkButton from "@/components/common/copy/CopyLink";
import FormattedDate from "@/components/common/formattedDate";
import PriorityPill from "@/components/common/pill/PriorityPill";
import StatusPill from "@/components/common/pill/StatusPill";
import ChangeTaskStatus from "@/components/task/ChangeTaskStatus";
import SubTasks from "@/components/task/SubTasks";
import TaskDescription from "@/components/task/TaskDescription";
import TaskEstimate from "@/components/task/TaskEstimate";
import TaskStatus from "@/components/task/TaskStatus";
import TaskTitle from "@/components/task/TaskTitle";
import BackButton from "@/icons/BackButton";
import useTaskStore from "@/store/task.store";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const { tasks } = useTaskStore();
  const navigate = useNavigate();

  // Helper function to find the task or subtask by id recursively
  const findTaskById = (tasks: Task[], id: number): Task | null => {
    for (let task of tasks) {
      if (task.id === id) return task;
      if (task.subtasks && task.subtasks.length > 0) {
        const foundSubtask = findTaskById(task.subtasks, id);
        if (foundSubtask) return foundSubtask;
      }
    }
    return null;
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
    <div className="flex-1 h-min min-w-fit bg-white m-3 rounded-lg p-5">
      <div onClick={() => navigate(-1)} className="pb-5 cursor-pointer">
        <BackButton />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TaskTitle task={task} />
          <CopyLinkButton taskId={task.id} />
        </div>
        <ChangeTaskStatus task={task} />
      </div>
      <TaskDescription task={task} />
      <div className="grid grid-cols-2 gap-y-3 w-[35%] my-8">
        <p className="font-medium text-slate-400">Status:</p>
        <TaskStatus task={task} />

        <p className="font-medium text-slate-400">Priority:</p>
        <span>
          <PriorityPill priority={task.priority}>{task.priority}</PriorityPill>
        </span>

        <p className="font-medium text-slate-400">Estimate:</p>
        <TaskEstimate task={task} />

        <p className="font-medium text-slate-400">Tags:</p>

        <p className="text-slate-600">
          {Array.isArray(task.tags) &&
            task.tags?.map((tag) => (
              <span className="mr-2">
                <StatusPill key={tag}>{tag}</StatusPill>
              </span>
            ))}
        </p>

        <p className="font-medium text-slate-400">Created At:</p>
        <FormattedDate date={task.createdAt} />
      </div>

      {task.subtasks && task.subtasks.length > 0 ? (
        <SubTasks subtasks={task.subtasks} />
      ) : (
        <p className="mt-5 text-gray-500">No subtasks available</p>
      )}
    </div>
  );
};

export default TaskDetails;
