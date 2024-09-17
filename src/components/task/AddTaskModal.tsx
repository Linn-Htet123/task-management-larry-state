import React, { useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Textarea from "@/components/common/textarea/Textarea";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import SelectBox from "../common/select/SelectBox";
import { priorities, Priority, Tag, Task } from "@/types/task";
import { ID } from "@/types";
import useTaskStore from "@/store/task.store";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import TaskTagInput from "./TaskTagInput";

interface Props {
  open: boolean;
  onClose: () => void;
  laneId?: ID;
  taskId?: ID;
}
const AddTaskModal = ({ open, onClose, laneId, taskId }: Props) => {
  const { setTasks } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskEstimate, setTaskEstimate] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<string>();
  const [taskTags, setTaskTags] = useState<Tag[]>([]);

  const handleSelectPriority = (selectedId: string) => {
    setTaskPriority(selectedId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!laneId) return;

    const newTask: Task = {
      id: uuid(),
      laneId,
      title: taskTitle,
      description: taskDescription,
      estimate: taskEstimate,
      priority: taskPriority as Priority,
      createdAt: new Date(),
      tags: taskTags,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success(newTask.title + " added successfully", { autoClose: 1500 });

    onClose();
    setTaskTitle("");
    setTaskDescription("");
    setTaskEstimate("");
    setTaskPriority(undefined);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      styles={{
        modal: {
          width: "600px",
        },
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Enter the task title here..."
            type="text"
            id="title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <Input
            placeholder="Estimation (in hours)"
            type="text"
            id="estimate"
            value={taskEstimate}
            onChange={(e) => setTaskEstimate(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <SelectBox
            onChange={handleSelectPriority}
            options={priorities}
            placeholder="Priority"
            value={taskPriority as string}
          />
        </div>

        <div>
          <TaskTagInput tags={taskTags} setTags={setTaskTags} />
        </div>
        <Textarea
          placeholder="Enter the task description here..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          rows={6}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit">Add Task</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
