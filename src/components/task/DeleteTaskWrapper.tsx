import React, { useState } from "react";
import DeleteTaskModal from "../common/modal/DeleteTaskModal";
import { ID } from "@/types";

const DeleteTaskWrapper = React.memo(
  ({ children, taskId }: { children: React.ReactNode; taskId: ID }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <DeleteTaskModal
          isOpenModal={isOpen}
          setIsOpenModal={setIsOpen}
          taskId={taskId}
        />
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </>
    );
  }
);

export default DeleteTaskWrapper;
