import React, { useState } from "react";
import Input from "../common/input/Input";
import TaskTags from "./TaskTags";
import { Tag } from "@/types/task";

interface Props {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const TaskTagInput = ({ tags, setTags }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tag: Tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      {tags.length > 0 && <TaskTags tags={tags} removeTag={removeTag} />}
      <Input
        placeholder="Tags"
        type="text"
        id="tags"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="block w-full mt-4 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      />
    </div>
  );
};

export default TaskTagInput;
