import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import KanBanLane from "./KanBanLane";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import useLaneStore from "@/store/lane.store";
import { Lane } from "@/types/lane";

import { createPortal } from "react-dom";
import useTaskStore from "@/store/task.store";
import { Task } from "@/types/task";
import TaskCard from "../task/TaskCard";

const KanBanBoard = () => {
  const { lanes, setLanes } = useLaneStore();
  const { tasks, setTasks } = useTaskStore();
  const [currentLane, setCurrentLane] = useState<Lane | null>();
  const [currentTask, setCurrentTask] = useState<Task | null>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const laneIDs = useMemo(() => lanes?.map((lane) => lane.id) || [], [lanes]);

  const handleOnDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Lane") {
      setCurrentLane(event.active.data.current?.lane);
    }

    if (event.active.data.current?.type === "Task") {
      setCurrentTask(event.active.data.current?.task);
    }
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    setCurrentLane(null);
    setCurrentTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeID = active.id;
    const overID = over.id;

    const isActiveALane = active.data.current?.type === "Lane";
    const isActiveATask = active.data.current?.type === "Task";
    const isOverALane = over.data.current?.type === "Lane";

    // Lane Sorting Logic
    if (isActiveALane && isOverALane) {
      if (activeID === overID) return;

      setLanes((prev) => {
        const activeLaneIdx = prev.findIndex((lane) => lane.id === activeID);
        const overLaneIdx = prev.findIndex((lane) => lane.id === overID);
        return arrayMove(prev, activeLaneIdx, overLaneIdx);
      });
    }

    // Task Moving Logic (Allowing drop into empty lanes)
    if (isActiveATask && isOverALane) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeID ? { ...task, laneId: overID } : task
        )
      );
    }
  };

  const handleOnDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskID = active.id;
    const overTaskID = over.id;

    if (activeTaskID === overTaskID) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    // Task Reordering Logic
    if (isActiveATask && isOverATask) {
      setTasks((prev) => {
        const activeIDx = prev.findIndex((task) => task.id === activeTaskID);
        const overIDx = prev.findIndex((task) => task.id === overTaskID);
        prev[activeIDx].laneId = prev[overIDx].laneId;

        return arrayMove(prev, activeIDx, overIDx);
      });
    }
  };

  return (
    <DndContext
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      onDragOver={handleOnDragOver}
      sensors={sensors}
    >
      <div
        className="flex gap-5 w-full overflow-x-auto overflow-y-auto items-center flex-1 p-7"
        id="board"
      >
        <SortableContext items={laneIDs}>
          {lanes?.map((lane) => (
            <KanBanLane
              key={lane.id}
              lane={lane}
              tasks={tasks.filter((task) => task.laneId === lane.id)}
            />
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {currentLane && (
            <KanBanLane
              key={currentLane.id}
              lane={currentLane}
              tasks={tasks.filter((task) => task.laneId === currentLane.id)}
            />
          )}
          {currentTask && <TaskCard task={currentTask} key={currentTask.id} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default KanBanBoard;
