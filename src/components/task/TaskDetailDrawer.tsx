import { Task } from "@/types/task";
import PriorityPill from "../common/pill/PriorityPill";
import GoToDetailTask from "./GoToDetailTask";
import CopyLinkButton from "../common/copy/CopyLink";
import ChangeTaskStatus from "./ChangeTaskStatus";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import SubTasks from "./SubTasks";
import TaskEstimate from "./TaskEstimate";
import LinkIcon from "@/icons/LinkIcon";
import FormattedDate from "@/components/common/FormattedDate";
import DeleteTaskWrapper from "./DeleteTaskWrapper";
import TrashIcon from "@/icons/TrashIcon";

const TaskDetailDrawer = ({ task }: { task: Task }) => {
  return (
    <div className="p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 mb-3">
            <GoToDetailTask taskId={task.id}>
              <LinkIcon />
            </GoToDetailTask>
            {/* <CopyLinkButton taskId={task.id} /> */}
            <DeleteTaskWrapper taskId={task.id}>
              <div className="bg-light p-2 rounded-md font-semibold text-slate-700 w-min cursor-pointer">
                <TrashIcon />
              </div>
            </DeleteTaskWrapper>
          </div>

          <ChangeTaskStatus task={task} />
        </div>
        {task.createdAt && <FormattedDate date={task.createdAt} />}

        <div className="mb-4 flex items-center gap-3">
          <PriorityPill priority={task.priority} isEditable taskId={task.id}>
            {task.priority}
          </PriorityPill>
          <TaskEstimate task={task} />
        </div>

        <TaskTitle task={task} />

        <TaskDescription task={task} />
      </div>
      {task.subtasks && <SubTasks subtasks={task.subtasks} />}
    </div>
  );
};

export default TaskDetailDrawer;
