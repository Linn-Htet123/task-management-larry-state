import useTask from "@/hooks/useTask";
import { ID } from "@/types";
import React from "react";
import Modal from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface DeleteTaskModalProps {
  taskId: ID;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteTaskModal = React.memo(
  ({ taskId, isOpenModal, setIsOpenModal }: DeleteTaskModalProps) => {
    const { deleteTask } = useTask();
    const navigate = useNavigate();
    const handleDeleteTask = () => {
      deleteTask(taskId);
      setIsOpenModal(false);
      toast.success("Task deleted successfully", { autoClose: 1500 });
      navigate("/");
    };

    return (
      <>
        <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)} center>
          <div className="p-6 ">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpenModal(false)}
                className="px-4 py-2 bg-light text-black rounded-md hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

export default DeleteTaskModal;
