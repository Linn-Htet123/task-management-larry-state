import { Link } from "react-router-dom";
import { ID } from "@/types";
import { Tooltip } from "react-tooltip";

type GoToDetailTaskProps = {
  taskId: ID;
  children?: React.ReactNode;
};

const GoToDetailTask = ({ taskId, children }: GoToDetailTaskProps) => {
  return (
    <Link
      to={`/task/${taskId}`}
      id="link"
      className="bg-light p-2 rounded-md font-semibold text-slate-700 w-min cursor-pointer"
    >
      {children}
      <Tooltip
        anchorSelect="#link"
        content="Go to details"
        place="left-start"
      />
    </Link>
  );
};

export default GoToDetailTask;
