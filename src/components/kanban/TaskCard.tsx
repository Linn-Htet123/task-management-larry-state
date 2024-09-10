import Card from "../common/card/Card";
import StatusPill from "../common/pill/StatusPill";

const TaskCard = () => {
  return (
    <div>
      <Card className="w-full rounded-md shadow-sm border border-slate-100">
        <div className="mb-3">
          <p className="font-semibold text-slate-700 pr-5 mb-2 text-[18px] -tracking-tighter leading-tight">
            Create API service for frontend.
          </p>
          <p className="text-slate-400 text-sm font-normal">
            3 api route need create.
          </p>
        </div>

        <StatusPill>Frontend</StatusPill>
      </Card>
    </div>
  );
};

export default TaskCard;
