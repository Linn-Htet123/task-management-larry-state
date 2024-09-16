import { Link } from "react-router-dom";
import { ID } from "@/types";

type GoToDetailTaskProps = {
  taskId: ID;
  children?: React.ReactNode;
};

const GoToDetailTask = ({ taskId, children }: GoToDetailTaskProps) => {
  return (
    <Link
      to={`/task/${taskId}`}
      className="bg-light p-2 rounded-md font-semibold text-slate-700 w-min cursor-pointer"
    >
      {children}
    </Link>
  );
};

export default GoToDetailTask;
