import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import CardHeader from "@/components/common/card/CardHeader";
import CardTitle from "@/components/common/card/CardTitle";
import AddLaneModal from "@/components/common/modal/AddLaneModal";
import KanBanBoard from "@/components/kanban/KanBanBoard";
import PlusIcon from "@/icons/PlusIcon";
import { useCallback, useMemo, useState } from "react";

const Board = () => {
  const [isAddLaneModalOpen, setIsAddLaneModalOpen] = useState(false);
  const toggleLaneModal = useCallback(() => {
    setIsAddLaneModalOpen(!isAddLaneModalOpen);
  }, [isAddLaneModalOpen]);
  const isOpenModal = useMemo(() => isAddLaneModalOpen, [isAddLaneModalOpen]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <AddLaneModal isOpen={isOpenModal} toggleModal={toggleLaneModal} />
      <Card className="rounded-none border border-slate-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">Board</CardTitle>
            <Button
              className="flex items-center gap-3 bg-primary"
              onClick={toggleLaneModal}
            >
              <PlusIcon />
              New Lane
            </Button>
          </div>
        </CardHeader>
      </Card>
      <KanBanBoard />
    </div>
  );
};

export default Board;
