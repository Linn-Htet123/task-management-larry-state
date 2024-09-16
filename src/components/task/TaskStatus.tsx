import useLaneStore from "@/store/lane.store";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";

interface TaskStatusProps {
  task: Task;
}

const TaskStatus = ({ task }: TaskStatusProps) => {
  const { lanes } = useLaneStore();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const selectedLane = lanes?.find((lane) => lane.id == task.laneId);
    if (selectedLane) {
      setStatus(selectedLane.name);
    }
  }, [task.laneId, lanes]);

  return <p className="text-slate-600">{status}</p>;
};

export default TaskStatus;
