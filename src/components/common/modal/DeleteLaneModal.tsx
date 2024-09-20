import useLaneStore from "@/store/lane.store";
import { ID } from "@/types";
import React from "react";
import Modal from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface DeleteLaneModalProps {
  landeId: ID;
  open: boolean;
  onClose: () => void;
}

const DeleteLaneModal = React.memo(
  ({ landeId, open, onClose }: DeleteLaneModalProps) => {
    const navigate = useNavigate();
    const { setLanes } = useLaneStore();
    const handleDeleteLane = () => {
      setLanes((prev) => prev.filter((lane) => lane.id !== landeId));
      toast.success("Lane deleted successfully", { autoClose: 1500 });
      onClose();
      navigate("/");
    };

    return (
      <>
        <Modal open={open} onClose={onClose} center>
          <div className="p-6 ">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this Lane?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  onClose();
                }}
                className="px-4 py-2 bg-light text-black rounded-md hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteLane}
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

export default DeleteLaneModal;
