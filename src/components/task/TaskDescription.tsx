import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Task } from "@/types/task";
import useTask from "@/hooks/useTask";

type TaskDescriptionProps = {
  task: Task;
};

const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [tempDescription, setTempDescription] = useState("");

  const { updateTask } = useTask();

  const handleDescriptionDoubleClick = () => setIsDescriptionEditable(true);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTempDescription(e.target.value);
  };

  const handleDescriptionKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (tempDescription.trim() !== "") {
        setIsDescriptionEditable(false);
        updateTask({ ...task, description: tempDescription });
        toast.success("Description updated successfully", {
          autoClose: 1500,
        });
      } else {
        setTempDescription(task.description);
        setIsDescriptionEditable(false);
        toast.error("Description can't be empty", { autoClose: 1500 });
      }
    }
  };

  const handleDescriptionBlur = () => {
    if (tempDescription.trim() === "") {
      setTempDescription(task.description);
    }
    setIsDescriptionEditable(false);
  };

  useEffect(() => {
    if (task.description) {
      setTempDescription(task.description);
    }
  }, [task.description]);

  return (
    <>
      {!isDescriptionEditable ? (
        <p
          onClick={handleDescriptionDoubleClick}
          className="text-slate-400 text-md font-normal flex-grow hover:bg-light p-1 cursor-text"
        >
          {task.description || "Double click to add a description"}
        </p>
      ) : (
        <textarea
          className="text-slate-400 text-md font-normal outline-none border-none w-full flex-grow bg-white border border-slate-300 p-2 rounded"
          value={tempDescription}
          onChange={handleDescriptionChange}
          onKeyDown={handleDescriptionKeyDown}
          onBlur={handleDescriptionBlur}
          autoFocus
        />
      )}
    </>
  );
};

export default TaskDescription;
