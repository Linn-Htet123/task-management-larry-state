import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import SelectBox, { Option } from "../common/select/SelectBox";
import { toast } from "react-toastify";
import useLaneStore from "@/store/lane.store";
import useTask from "@/hooks/useTask";

interface ChangeTaskStatusProps {
  task: Task;
}

const ChangeTaskStatus = ({ task }: ChangeTaskStatusProps) => {
  const { lanes } = useLaneStore();
  const { updateTask } = useTask();
  const [tempStatus, setTempStatus] = useState(task.laneId);

  useEffect(() => {
    setTempStatus(task.laneId);
  }, [task.laneId, lanes]);

  const handleOnChangeTaskStatus = (selectedId: string) => {
    const selectedLane = lanes?.find((lane) => lane.id == selectedId);

    if (selectedLane) {
      updateTask({ ...task, laneId: selectedLane.id });
      setTempStatus(selectedLane.id);
      toast.success("Status updated successfully", { autoClose: 1500 });
    } else {
      console.error("Selected lane not found.");
      toast.error("Failed to update status.");
    }
  };

  return (
    <SelectBox
      onChange={handleOnChangeTaskStatus}
      options={(lanes as Option[]) || []}
      value={tempStatus as string}
      placeholder="Status"
    />
  );
};

export default ChangeTaskStatus;
