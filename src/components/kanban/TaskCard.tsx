import { useSortable } from "@dnd-kit/sortable";
import Card from "../common/card/Card";
import { CSS } from "@dnd-kit/utilities";
import StatusPill from "../common/pill/StatusPill";
import { Task } from "@/types/task";
import PriorityPill from "../common/pill/PriorityPill";
import Ellipsis from "@/icons/Ellipsis";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import Drawer from "react-modern-drawer";

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

  const toggleDrawer = () => {
    setIsDetailsDrawerOpen((prev) => !prev);
  };

  if (isDragging) {
    return (
      <div
        className="my-3"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="min-w-[350px] bg-opacity-0 h-[140px]"></div>
      </div>
    );
  }

  return (
    <div
      className="my-3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        toggleDrawer();
      }}
    >
      <Drawer
        open={isDetailsDrawerOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{ width: "500px", maxWidth: "500px" }}
      >
        <div className="p-5">Hello World</div>
      </Drawer>
      <Card className="w-full rounded-md shadow-sm border border-slate-100">
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="mb-2 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <PriorityPill priority={task.priority}>
                  {task.priority}
                </PriorityPill>
                <span className="text-sm text-slate-400">{task.estimate}</span>
              </div>
              <div className="text-slate-400">
                <Menu
                  menuButton={
                    <MenuButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent onClick from firing
                      }}
                    >
                      <Ellipsis />
                    </MenuButton>
                  }
                >
                  <MenuItem className={"hover:bg-light hover:text-slate-800"}>
                    Details
                  </MenuItem>
                  <MenuItem className={"hover:bg-light hover:text-slate-800"}>
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            </span>
            <p className="font-semibold text-slate-700 pr-5 mb-2 text-[18px] -tracking-tighter leading-tight">
              {task.title}
            </p>
            <p className="text-slate-400 text-sm font-normal flex-grow">
              {task.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {task.tags.map((tag) => (
              <StatusPill key={tag}>{tag}</StatusPill>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
