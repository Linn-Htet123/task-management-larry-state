import { Task } from "@/types/task";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import Button from "../common/button/Button";
import PlusIcon from "@/icons/PlusIcon";

const AddSubTask = ({
  task,
  showLabel = false,
}: {
  task: Task;
  showLabel?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span>
      <AddTaskModal
        task={task}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button
        className="flex gap-3"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PlusIcon />
        {showLabel && <span>Sub Task</span>}
      </Button>
    </span>
  );
};

export default AddSubTask;
