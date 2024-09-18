import PlusIcon from "@/icons/PlusIcon";
import TaskCard from "../task/TaskCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lane } from "@/types/lane";
import { useMemo, useState } from "react";
import useLaneStore from "@/store/lane.store";
import { toast } from "react-toastify";
import { Task } from "@/types/task";
import EllipsisVertical from "@/icons/EllipsisVertical";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import AddTaskModal from "../task/AddTaskModal";
import DeleteLaneModal from "../common/modal/DeleteLaneModal";

const KanBanLane = ({ lane, tasks }: { lane: Lane; tasks: Task[] }) => {
  const [isLaneTitleEditable, setIsLaneTitleEditable] = useState(false);
  const [laneName, setLaneName] = useState(lane.name);
  const [tempLaneName, setTempLaneName] = useState(lane.name);
  const { setLanes } = useLaneStore();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isLaneDeleteModal, setIsLaneDeleteModal] = useState(false);

  const taskIDs = useMemo(() => tasks?.map((task) => task.id) || [], [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lane.id,
    data: {
      type: "Lane",
      lane,
    },
    disabled: isLaneTitleEditable,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleEditLaneName = () => {
    setTempLaneName(laneName);
    setIsLaneTitleEditable(true);
  };

  const handleBlur = () => {
    setIsLaneTitleEditable(false);
    setTempLaneName(laneName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempLaneName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tempLaneName.trim() !== "") {
        setLaneName(tempLaneName);
        setLanes((prev) =>
          prev.map((currentLane) =>
            currentLane.id === lane.id
              ? { ...currentLane, name: tempLaneName }
              : currentLane
          )
        );
        if (tempLaneName !== lane.name) {
          toast.success("Title updated successfully", { autoClose: 1500 });
        }
      } else {
        toast.error("Lane name can not be empty!", { autoClose: 1500 });
      }
      setIsLaneTitleEditable(false);
    }
  };

  if (isDragging) {
    return (
      <div
        className="h-full min-h-auto min-w-[350px] relative bg-slate-400 rounded-lg bg-opacity-10 border-2 border-dashed border-primary"
        ref={setNodeRef}
        style={style}
      />
    );
  }

  return (
    <div
      className="h-full min-h-full min-w-[350px] relative"
      ref={setNodeRef}
      style={style}
    >
      <AddTaskModal
        open={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        laneId={lane.id}
      />
      <DeleteLaneModal
        landeId={lane.id}
        isOpenModal={isLaneDeleteModal}
        setIsOpenModal={setIsAddTaskOpen}
      />
      <div
        className="flex justify-between items-center px-4 py-2 border border-slate-100 shadow-sm mb-2 cursor-grab bg-white rounded-lg"
        {...attributes}
        {...listeners}
      >
        <div className="flex gap-3 items-center">
          <h3 className="font-semibold text-slate-400 text-xs rounded-full w-5 h-5 text-center flex justify-center items-center pb-[2px] bg-secondary">
            {tasks.length}
          </h3>
          {!isLaneTitleEditable ? (
            <button
              onClick={handleEditLaneName}
              className=" hover:bg-light p-1"
            >
              <h3 className="font-semibold text-slate-400 text-sm cursor-text uppercase w-56 max-w-56 text-start truncate overflow-hidden whitespace-nowrap">
                {laneName}
              </h3>
            </button>
          ) : (
            <div>
              <input
                className="bg-white rounded outline-none text-sm font-semibold text-slate-400"
                value={tempLaneName}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          )}
        </div>
        <span className="text-slate-400 cursor-pointer font-normal">
          <Menu
            menuButton={
              <MenuButton>
                <EllipsisVertical />
              </MenuButton>
            }
          >
            <MenuItem
              className={"hover:bg-light hover:text-slate-800"}
              onClick={() => setIsAddTaskOpen(true)}
            >
              New Task
            </MenuItem>
            <MenuItem
              className={"hover:bg-light hover:text-slate-800"}
              onClick={() => setIsLaneDeleteModal(true)}
            >
              Delete
            </MenuItem>
          </Menu>
        </span>
      </div>

      <div
        className="w-full text-primary flex gap-4 items-center py-1 justify-center rounded-xl border-2 border-dotted border-primary text-center bg-secondary cursor-pointer"
        onClick={() => setIsAddTaskOpen(true)}
      >
        <PlusIcon />
        Add Task
      </div>
      <SortableContext items={taskIDs}>
        {tasks.map((task) => {
          if (task.laneId !== lane.id) return null;
          return (
            <div className="w-[350px] h-min" key={task.id}>
              <TaskCard task={task} />
            </div>
          );
        })}
      </SortableContext>
    </div>
  );
};

export default KanBanLane;
