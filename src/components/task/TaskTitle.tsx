import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Task } from "@/types/task";
import useTask from "@/hooks/useTask";

type TaskTitleProps = {
  task: Task;
};

const TaskTitle = ({ task }: TaskTitleProps) => {
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const { updateTask } = useTask();
  const handleTitleDoubleClick = () => setIsTitleEditable(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tempTitle.trim() !== "") {
        setIsTitleEditable(false);
        updateTask({ ...task, title: tempTitle });
        toast.success("Task title updated successfully", { autoClose: 1500 });
      } else {
        setTempTitle(task.title);
        setIsTitleEditable(false);
        toast.error("Task title can't be empty", { autoClose: 1500 });
      }
    }
  };

  const handleTitleBlur = () => {
    if (tempTitle.trim() === "") {
      setTempTitle(task.title);
    }
    setIsTitleEditable(false);
  };

  useEffect(() => {
    if (task.title) {
      setTempTitle(task.title);
    }
  }, [task.title]);

  return (
    <>
      {!isTitleEditable ? (
        <p
          onClick={handleTitleDoubleClick}
          className="font-semibold text-slate-700 text-[22px] -tracking-tighter leading-tight hover:bg-light p-1 cursor-text"
        >
          {task.title}
        </p>
      ) : (
        <input
          className="w-full outline-none border-none font-semibold text-slate-700 mb-7 text-[22px] -tracking-tighter leading-tight bg-white border border-slate-300 p-1 rounded"
          value={tempTitle}
          onChange={handleTitleChange}
          onKeyDown={handleTitleKeyDown}
          onBlur={handleTitleBlur}
          autoFocus
        />
      )}
    </>
  );
};

export default TaskTitle;
