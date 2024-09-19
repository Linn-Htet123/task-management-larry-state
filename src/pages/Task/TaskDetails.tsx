import CopyLinkButton from "@/components/common/copy/CopyLink";
import FormattedDate from "@/components/common/FormattedDate";
import PriorityPill from "@/components/common/pill/PriorityPill";
import AddSubTask from "@/components/task/AddSubTask";
import ChangeTaskStatus from "@/components/task/ChangeTaskStatus";
import DeleteTaskWrapper from "@/components/task/DeleteTaskWrapper";
import SubTasks from "@/components/task/SubTasks";
import TaskDescription from "@/components/task/TaskDescription";
import TaskEstimate from "@/components/task/TaskEstimate";
import TaskStatus from "@/components/task/TaskStatus";
import TaskTags from "@/components/task/TaskTags";
import TaskTitle from "@/components/task/TaskTitle";
import BackButton from "@/icons/BackButton";
import TrashIcon from "@/icons/TrashIcon";
import useTaskStore from "@/store/task.store";
import { ID } from "@/types";
import { Task } from "@/types/task";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const { tasks } = useTaskStore();
  const navigate = useNavigate();

  const findTaskById = useCallback(
    (tasks: Task[], id: ID): Task | null => {
      for (const task of tasks) {
        if (task.id === id) return task;
        if (task.subtasks?.length) {
          const foundSubtask = findTaskById(task.subtasks, id);
          if (foundSubtask) return foundSubtask;
        }
      }
      return null;
    },
    [task, id]
  );

  useEffect(() => {
    if (id && Array.isArray(tasks)) {
      setTask(findTaskById(tasks, id));
    }
  }, [id, tasks, findTaskById]);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="flex-1 h-min min-w-fit bg-white m-3 rounded-lg p-5">
      <div onClick={() => navigate(-1)} className="pb-5 cursor-pointer">
        <BackButton />
      </div>
      <div className="flex items-startx justify-between">
        <div className="w-[75%] mb-4">
          <TaskTitle task={task} />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-min">
            <AddSubTask task={task} />
          </div>
          <CopyLinkButton taskId={task.id} />
          <DeleteTaskWrapper taskId={task.id}>
            <div className="bg-light p-2 rounded-md font-semibold text-slate-700 w-min cursor-pointer">
              <TrashIcon />
            </div>
          </DeleteTaskWrapper>
          <ChangeTaskStatus task={task} />
        </div>
      </div>
      <TaskDescription task={task} />
      <div className="grid grid-cols-2 gap-y-3 w-[35%] my-8">
        <p className="font-medium text-slate-400">Status:</p>
        <TaskStatus task={task} />

        <p className="font-medium text-slate-400">Priority:</p>
        <div className="w-min">
          <PriorityPill priority={task.priority} isEditable task={task}>
            {task.priority}
          </PriorityPill>
        </div>

        <p className="font-medium text-slate-400">Estimate:</p>
        <TaskEstimate task={task} />

        <p className="font-medium text-slate-400">Tags:</p>
        <p className="text-slate-600">
          <TaskTags tags={task.tags} />
        </p>

        <p className="font-medium text-slate-400">Created At:</p>
        <FormattedDate date={task.createdAt} />
      </div>

      {task.subtasks?.length ? (
        <SubTasks subtasks={task.subtasks} />
      ) : (
        <p className="mt-5 text-gray-500">No subtasks available</p>
      )}
    </div>
  );
};

export default TaskDetails;
