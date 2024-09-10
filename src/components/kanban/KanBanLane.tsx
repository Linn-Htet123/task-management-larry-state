import PlusIcon from "@/icons/PlusIcon";
import TaskCard from "./TaskCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lane } from "@/types/lane";
import { useState } from "react";
import useLaneStore from "@/store/lane.store";
import { toast } from "react-toastify";

const KanBanLane = ({ lane }: { lane: Lane }) => {
  const [isLaneTitleEditable, setIsLaneTitleEditable] = useState(false);
  const [laneName, setLaneName] = useState(lane.name);
  const [tempLaneName, setTempLaneName] = useState(lane.name);
  const { setLanes } = useLaneStore();

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
      <div
        className="flex justify-between items-center px-4 py-2 border border-slate-100 shadow-sm mb-2 cursor-grab bg-white rounded-lg"
        {...attributes}
        {...listeners}
      >
        <div className="flex gap-3 items-center">
          <h3 className="font-semibold text-slate-400 text-sm">{0}</h3>
          {!isLaneTitleEditable ? (
            <button onClick={handleEditLaneName}>
              <h3 className="font-semibold text-slate-400 text-sm cursor-text uppercase">
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
        <span className="text-slate-400 font-bold cursor-pointer">
          <PlusIcon />
        </span>
      </div>

      <div className="w-full text-primary flex gap-4 items-center py-1 justify-center rounded-xl border-2 border-dashed border-primary text-center bg-secondary">
        <PlusIcon />
        Add Task
      </div>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default KanBanLane;
