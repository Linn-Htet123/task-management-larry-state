import { Lane } from "@/types/lane";
import { createStore } from "larry-state";
// import { v4 as uuid } from "uuid";

type LaneStore = {
  lanes: Lane[];
  setLanes: (lanes: Lane[] | ((prev: Lane[]) => Lane[])) => void;
};

const useLaneStore = (): LaneStore => {
  const { value: lanes, updateValue: setLanes } = createStore<Lane[]>({
    name: "lanes",
    defaultValue: [
      {
        id: 1,
        name: "TO DO",
      },
      {
        id: 2,
        name: "IN PROGRESS",
      },
    ],
    isPersist: true,
  });

  return { lanes, setLanes };
};

export default useLaneStore;
