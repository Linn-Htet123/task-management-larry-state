import { Lane } from "@/types/lane";
import { createStore } from "larry-state";

type LaneStore = {
  lanes: Lane[];
  setLanes: (lanes: Lane[] | ((prev: Lane[]) => Lane[])) => void;
};

const useLaneStore = (): LaneStore => {
  const { value: lanes, updateValue: setLanes } = createStore<Lane[]>({
    name: "lanes",
    defaultValue: [],
    isPersist: true,
  });

  return { lanes, setLanes };
};

export default useLaneStore;
