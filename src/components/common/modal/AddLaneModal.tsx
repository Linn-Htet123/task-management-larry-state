import { Modal } from "react-responsive-modal";
import Input from "../input/Input";
import Button from "../button/Button";
import { v4 as uuid } from "uuid";
import useLaneStore from "@/store/lane.store";
import { useState } from "react";
import { toast } from "react-toastify";

const AddLaneModal = ({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: () => void;
}) => {
  const { setLanes } = useLaneStore();
  const [newLaneName, setNewLaneName] = useState("");

  const handleAddLane = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLanes((prev) => {
      return [
        ...prev,
        {
          id: uuid(),
          name: newLaneName,
        },
      ];
    });
    toast.success(`${newLaneName} added successfully`);
    toggleModal();
  };

  return (
    <div>
      <Modal open={isOpen} onClose={toggleModal} center>
        <form className="py-8" onSubmit={handleAddLane}>
          <label htmlFor="newLane" className="text-slate-400">
            Add new lane
          </label>
          <Input
            className="mt-2"
            id="newLane"
            required
            style={{ width: "400px" }}
            onChange={(e) => setNewLaneName(e.target.value)}
          />
          <div className="flex justify-end items-center">
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddLaneModal;
