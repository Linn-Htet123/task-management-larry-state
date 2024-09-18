import { priorities, Priority, Task } from "@/types/task";
import getPriorityClasses from "@/utils/getPriorityColor";
import React, { useState, useEffect, useRef } from "react";
import SelectBox from "../select/SelectBox";
import { ID } from "@/types";
import useTaskStore from "@/store/task.store";
import { toast } from "react-toastify";

interface PriorityPillProps {
  taskId?: ID;
  priority: Priority;
  children: React.ReactNode;
  isEditable?: boolean;
}

const PriorityPill: React.FC<PriorityPillProps> = React.memo(
  ({ taskId, priority, children, isEditable = false }) => {
    const { bg, text } = getPriorityClasses(priority);
    const [taskPriority, setTaskPriority] = useState<string | undefined>(
      priority
    );
    const [isEditSelectOpen, setIsEditSelectOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { setTasks } = useTaskStore();

    const handleOnChange = (value: string) => {
      setTaskPriority(value);
      setIsEditSelectOpen(false);
      toast.success("Priority updated successfully", { autoClose: 1500 });
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsEditSelectOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (taskId) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? ({ ...task, priority: taskPriority } as Task)
              : task
          )
        );
      }
    }, [taskPriority, taskId]);

    const toggleSelectBox = () => {
      if (isEditable) {
        setIsEditSelectOpen((prev) => !prev);
      }
    };

    return (
      <div className="relative" ref={containerRef}>
        <span
          className={`${text} ${bg} rounded-md px-3 py-1 text-xs font-medium inline cursor-pointer`}
          onClick={toggleSelectBox}
        >
          {children}
        </span>

        {isEditSelectOpen && (
          <div className="ml-3 p-2 bg-white rounded-md absolute right-[-90px] bottom-[-60px] w-[150px] z-10">
            <SelectBox
              onChange={handleOnChange}
              options={priorities}
              placeholder="Priority"
              value={taskPriority || ""}
            />
          </div>
        )}
      </div>
    );
  }
);

export default PriorityPill;
