import { Tag } from "@/types/task";
import StatusPill from "../common/pill/StatusPill";
import React, { useMemo } from "react";
import { v4 as uuid } from "uuid";

interface Props {
  tags: Tag[];
  removeTag?: (tag: Tag) => void;
}
const TaskTags = React.memo(({ tags, removeTag }: Props) => {
  const taskTags = useMemo(() => tags, [tags]);

  return (
    <>
      {taskTags.length > 0 && (
        <span className="flex gap-2 flex-wrap">
          {taskTags.map((tag) => (
            <StatusPill key={uuid()} removeTag={removeTag}>
              {tag}
            </StatusPill>
          ))}
        </span>
      )}
    </>
  );
});

export default TaskTags;
