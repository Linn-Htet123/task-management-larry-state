import { Link } from "react-router-dom";
import { Task } from "@/types/task";
import PriorityPill from "../common/pill/PriorityPill";

type SubTasksProps = {
  subtasks: Task[];
};

const SubTasks = ({ subtasks }: SubTasksProps) => {
  return (
    <div className="flex-grow my-4">
      <p className="text-md font-medium flex-grow my-4 flex gap-2 items-end">
        Sub Tasks{" "}
        {subtasks.length > 0 && (
          <span className="w-5 h-5 text-xs rounded-full bg-light text-center flex justify-center items-center">
            {subtasks.length}
          </span>
        )}
      </p>

      {Array.isArray(subtasks) && subtasks.length > 0 ? (
        subtasks.map((subtask) => (
          <Link
            to={`/task/${subtask.id}`}
            key={subtask.id}
            className="flex items-center justify-between border-b hover:bg-light cursor-pointer border-light p-3 mb-2 rounded-lg"
          >
            <div className="truncate overflow-hidden whitespace-nowrap inline-block w-[80%] text-slate-600">
              {subtask.title}
            </div>
            <div className="pr-3">
              <PriorityPill priority={subtask.priority}>
                {subtask.priority}
              </PriorityPill>
            </div>
          </Link>
        ))
      ) : (
        <div className="h-full w-full flex justify-center items-center flex-col">
          No subtasks
        </div>
      )}
    </div>
  );
};

export default SubTasks;
