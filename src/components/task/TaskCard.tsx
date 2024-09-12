import { useSortable } from "@dnd-kit/sortable";
import Card from "../common/card/Card";
import { CSS } from "@dnd-kit/utilities";
import StatusPill from "../common/pill/StatusPill";
import { Task } from "@/types/task";
import PriorityPill from "../common/pill/PriorityPill";
import Ellipsis from "@/icons/Ellipsis";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useState, useCallback } from "react";
import Drawer from "react-modern-drawer";
import CheveronDouble from "@/icons/CheveronDouble";
import TaskDetailDrawer from "./TaskDetailDrawer";
import SubTaskIcon from "@/icons/SubTaskIcon";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: false,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleDrawer = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsDrawerOpen((prev) => !prev);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setIsDetailsDrawerOpen(false);
  }, []);

  if (isDragging) {
    return (
      <div
        className="my-3"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="min-w-[350px] bg-opacity-0 h-[140px] my-3"></div>
      </div>
    );
  }

  return (
    <>
      <Drawer
        open={isDetailsDrawerOpen}
        direction="right"
        size="600px"
        onClose={handleDrawerClose}
      >
        <div
          className="p-5 w-min h-min text-slate-400 font-bold cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleDrawerClose();
          }}
        >
          <CheveronDouble />
        </div>
        <TaskDetailDrawer task={task} />
      </Drawer>
      <div
        className="my-3"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={(e) => {
          if (!isDetailsDrawerOpen) {
            e.stopPropagation();
            toggleDrawer(e);
          }
        }}
      >
        <Card className="w-full rounded-md shadow-sm border border-slate-100">
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col">
              <span className="mb-2 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {/* <PriorityPill priority={task.priority}>
                    {task.priority}
                  </PriorityPill> */}
                  <span className="text-sm text-slate-400">
                    {task.estimate}
                  </span>
                </div>
                <div className="text-slate-400">
                  <Menu
                    menuButton={
                      <MenuButton onClick={(e) => e.stopPropagation()}>
                        <Ellipsis />
                      </MenuButton>
                    }
                  >
                    <MenuItem className="hover:bg-light hover:text-slate-800">
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </span>
              <p className="font-semibold text-slate-700 pr-5 mb-2 text-[18px] -tracking-tighter leading-tight line-clamp-2">
                {task.title}
              </p>
              <p className="text-slate-400 text-sm font-normal flex-grow line-clamp-3">
                {task.description}
              </p>
            </div>
            <div className="flex justify-between items-end mt-4">
              {/* <div className="flex flex-wrap gap-2 mt-4">
                {task.tags.map((tag) => (
                  <StatusPill key={tag}>{tag}</StatusPill>
                ))}
              </div> */}
              <PriorityPill priority={task.priority}>
                {task.priority}
              </PriorityPill>
              {task.subtasks?.length && (
                <span className="text-slate-400 text-xs flex gap-1 items-center ">
                  <SubTaskIcon />
                  <span className="w-5 h-5 text-xs rounded-full bg-light text-center flex justify-center items-center">
                    {`${task.subtasks.length}`}
                  </span>
                </span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TaskCard;
