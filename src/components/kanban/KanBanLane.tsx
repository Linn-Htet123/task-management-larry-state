import PlusIcon from "@/icons/PlusIcon";
import TaskCard from "./TaskCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lane } from "@/types/lane";
import { useState, useRef, useEffect } from "react";
import Input from "../common/input/Input";

const KanBanLane = ({ lane }: { lane: Lane }) => {
  const [isLaneTitleEditable, setIsLaneTitleEditable] = useState(false);
  const [laneName, setLaneName] = useState(lane.name);

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
    setIsLaneTitleEditable(true);
  };

  const handleBlur = () => {
    setIsLaneTitleEditable(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLaneName(e.target.value);
  };

  if (isDragging) {
    return (
      <div
        className="h-full min-h-auto min-w-[350px] relative bg-slate-400 bg-opacity-10"
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
          {!isLaneTitleEditable ? (
            <h3
              className="font-semibold text-slate-400 text-sm cursor-text"
              onClick={handleEditLaneName}
            >
              {laneName}
            </h3>
          ) : (
            <div>
              <input
                className="bg-white rounded outline-none text-sm font-semibold text-slate-400"
                value={laneName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />
            </div>
          )}
          <h3 className="font-semibold text-slate-400 text-sm">{0}</h3>
        </div>
        <span className="text-slate-400 font-bold cursor-pointer">
          <PlusIcon />
        </span>
      </div>
      <TaskCard />
    </div>
  );
};

export default KanBanLane;
