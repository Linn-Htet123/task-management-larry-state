import { Priority } from "@/types/task";
import getPriorityClasses from "@/utils/getPriorityColor";
import React from "react";

interface PriorityPillProps {
  priority: Priority;
  children: React.ReactNode;
}

const PriorityPill = ({ priority, children }: PriorityPillProps) => {
  const { border, text } = getPriorityClasses(priority);

  return (
    <span
      className={`${text} bg-light border ${border} rounded-md px-3 py-1 text-xs font-medium inline`}
    >
      {children}
    </span>
  );
};

export default PriorityPill;
