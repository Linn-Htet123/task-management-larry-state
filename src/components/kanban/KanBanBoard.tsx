import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import KanBanLane from "./KanBanLane";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useCallback, useMemo, useState } from "react";
import useLaneStore from "@/store/lane.store";
import { Lane } from "@/types/lane";

import { createPortal } from "react-dom";

const KanBanBoard = () => {
  const { lanes, setLanes } = useLaneStore();
  const [currentLane, setCurrentLane] = useState<Lane | null>();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const laneIDs = useMemo(() => lanes?.map((lane) => lane.id) || [], [lanes]);

  const handleOnDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === "Lane") {
      setCurrentLane(event.active.data.current?.lane);
    }
  }, []);

  const handleOnDragEnd = (event: DragEndEvent) => {
    setCurrentLane(null);

    const { active, over } = event;
    if (!over) return;

    const activeID = active.id;
    const overID = over.id;

    const isActiveALane = active.data.current?.type === "Lane";
    const isOverALane = over.data.current?.type === "Lane";

    if (isActiveALane && isOverALane) {
      if (activeID === overID) return;
      setLanes((prev) => {
        const activeLaneIdx = prev.findIndex((lane) => lane.id === activeID);
        const overLaneIdx = prev.findIndex((lane) => lane.id === overID);
        return arrayMove(prev, activeLaneIdx, overLaneIdx);
      });
    }
  };

  return (
    <DndContext
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      sensors={sensors}
    >
      <div
        className="flex gap-5 w-full overflow-x-auto overflow-y-auto items-center flex-1 p-7"
        id="board"
      >
        <SortableContext items={laneIDs}>
          {lanes?.map((lane) => (
            <KanBanLane key={lane.id} lane={lane} />
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {currentLane && (
            <KanBanLane key={currentLane.id} lane={currentLane} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default KanBanBoard;
