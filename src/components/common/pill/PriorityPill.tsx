import { priorities, Priority, Task } from "@/types/task";
import getPriorityClasses from "@/utils/getPriorityColor";
import React, { useState, useEffect, useRef } from "react";
import SelectBox from "../select/SelectBox";
import { toast } from "react-toastify";
import useTask from "@/hooks/useTask";

interface PriorityPillProps {
  task?: Task;
  priority: Priority;
  children: React.ReactNode;
  isEditable?: boolean;
}

const PriorityPill: React.FC<PriorityPillProps> = React.memo(
  ({ task, priority, children, isEditable = false }) => {
    const { bg, text } = getPriorityClasses(priority);
    const [taskPriority, setTaskPriority] = useState<string>(priority);
    const [isEditSelectOpen, setIsEditSelectOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { updateTask } = useTask();

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
      if (task) {
        updateTask({ ...task, priority: taskPriority as Priority });
      }
    }, [taskPriority]);

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
