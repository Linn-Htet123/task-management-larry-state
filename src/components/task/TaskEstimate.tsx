import { useState } from "react";
import { Task } from "@/types/task";
import useTask from "@/hooks/useTask";
import { toast } from "react-toastify";

interface TaskEstimateProps {
  task: Task;
}

const TaskEstimate = ({ task }: TaskEstimateProps) => {
  const { updateTask } = useTask();

  const [isEditingEstimate, setIsEditingEstimate] = useState(false);
  const [estimate, setEstimate] = useState(task.estimate);

  const handleEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimate(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (estimate.trim() === "") {
        setEstimate(task.estimate);
        toast.error("Estimate can't be empty", { autoClose: 1500 });
      } else {
        updateTask({ ...task, estimate });
        toast.success("Estimate updated successfully", { autoClose: 1500 });
      }
      setIsEditingEstimate(false);
    }
  };

  const handleBlur = () => {
    if (estimate.trim() === "") {
      setEstimate(task.estimate);
    }
    setIsEditingEstimate(false);
  };

  return (
    <div className="estimate-field">
      {isEditingEstimate ? (
        <input
          type="text"
          value={estimate}
          onChange={handleEstimateChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="text-sm text-slate-400 cursor-pointer outline-none border-0"
          autoFocus
        />
      ) : (
        <div
          onClick={() => setIsEditingEstimate(true)}
          className="text-sm text-slate-400 hover:bg-light p-1 cursor-text"
        >
          {estimate}
        </div>
      )}
    </div>
  );
};

export default TaskEstimate;
