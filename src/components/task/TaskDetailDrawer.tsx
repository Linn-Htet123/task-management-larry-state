import { useState, useEffect } from "react";
import ClipBoard from "@/icons/ClipBoard";
import LinkIcon from "@/icons/LinkIcon";
import { Task } from "@/types/task";
import PriorityPill from "../common/pill/PriorityPill";
import SelectBox from "../common/select/SelectBox";
import useTaskStore from "@/store/task.store";
import { toast } from "react-toastify";
import useLaneStore from "@/store/lane.store";
import dayjs from "dayjs";

const TaskDetailDrawer = ({ task }: { task: Task }) => {
  const { setTasks } = useTaskStore();
  const { lanes } = useLaneStore();

  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.title);
  const [tempDescription, setTempDescription] = useState(task.description);
  const [tempStatus, setTempStatus] = useState(task.laneId);

  useEffect(() => {
    // Ensure tempStatus is updated when task.laneId changes
    setTempStatus(task.laneId);
  }, [task.laneId]);

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleTitleDoubleClick = () => setIsTitleEditable(true);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTempTitle(e.target.value);

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

  const handleDescriptionDoubleClick = () => setIsDescriptionEditable(true);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTempDescription(e.target.value);

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

  const handleOnStatusChange = (selectedId: string) => {
    const selectedLane = lanes.find((lane) => lane.id == selectedId);

    if (selectedLane) {
      updateTask({ ...task, laneId: selectedLane.id });
      setTempStatus(selectedLane.id); // Update with selected lane ID
      toast.success("Status updated successfully", { autoClose: 1500 });
    }
  };

  return (
    <div className="p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-light p-2 rounded-md font-semibold text-slate-700 w-min cursor-pointer">
              <LinkIcon />
            </div>
            <div className="bg-light p-2 rounded-md font-semibold text-slate-700 w-min cursor-pointer">
              <ClipBoard />
            </div>
          </div>

          <SelectBox
            onChange={handleOnStatusChange}
            options={lanes}
            value={tempStatus as string}
            placeholder="Status"
          />
        </div>
        {task.createdAt && (
          <div className="text-sm text-slate-400 mb-3">
            {dayjs(task.createdAt).format("DD MMMM YYYY, dddd")}
          </div>
        )}

        {!isTitleEditable ? (
          <p
            onClick={handleTitleDoubleClick}
            className="font-semibold text-slate-700 mb-7 text-[22px] -tracking-tighter leading-tight"
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

        <div className="my-4 flex items-center gap-3">
          <PriorityPill priority={task.priority}>{task.priority}</PriorityPill>
          <div className="text-sm text-slate-400">{task.estimate}</div>
        </div>

        {!isDescriptionEditable ? (
          <p
            onClick={handleDescriptionDoubleClick}
            className="text-slate-400 text-md font-normal flex-grow"
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
            rows={5}
          />
        )}
      </div>

      <div className="flex-grow my-4">
        <p className="text-md font-medium flex-grow my-4 flex gap-2 items-end">
          Sub Tasks{" "}
          {task.subtasks?.length && (
            <span className="w-5 h-5 text-xs rounded-full bg-light text-center flex justify-center items-center">
              {task.subtasks.length}
            </span>
          )}
        </p>

        {Array.isArray(task.subtasks) && task.subtasks.length > 0 ? (
          task.subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center justify-between border-b hover:bg-light cursor-pointer border-light p-3 mb-2 rounded-lg"
            >
              <p className="truncate overflow-hidden whitespace-nowrap inline-block w-[80%] text-slate-600">
                {subtask.title}
              </p>
              <div className="w-[20%] pr-3">
                <PriorityPill priority={subtask.priority}>
                  {subtask.priority}
                </PriorityPill>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full w-full flex justify-center items-center flex-col">
            No subtasks
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailDrawer;
