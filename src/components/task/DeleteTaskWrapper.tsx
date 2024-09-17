import useTaskStore from "@/store/task.store";
import { ID } from "@/types";
import React, { useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css"; // Make sure to import styles

interface DeleteTaskWrapperProps {
  children: React.ReactNode;
  taskId: ID;
}

const DeleteTaskWrapper = React.memo(
  ({ children, taskId }: DeleteTaskWrapperProps) => {
    const { setTasks } = useTaskStore();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleDeleteTask = () => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setIsOpenModal(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      setIsOpenModal(true);
    };

    return (
      <>
        <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)} center>
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setIsOpenModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <span
          onClick={handleClick}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          {children}
        </span>
      </>
    );
  }
);

export default DeleteTaskWrapper;
