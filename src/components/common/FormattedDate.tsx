import dayjs from "dayjs";

const FormattedDate = ({ date }: { date: Date }) => {
  return (
    <div>
      <div className="text-sm text-slate-400 mb-3">
        {dayjs(date).format("DD MMMM YYYY, HH:mm A")}
      </div>
    </div>
  );
};

export default FormattedDate;
