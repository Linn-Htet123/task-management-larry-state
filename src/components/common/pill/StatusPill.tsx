import getRandomAccent from "@/utils/getRandomAccentColor";
import { useMemo } from "react";

const StatusPill = ({ children }: { children: React.ReactNode }) => {
  const getBgColor = useMemo(() => getRandomAccent(), []);
  return (
    <span
      className={`${getBgColor} rounded-2xl px-2 py-1 text-xs font-medium text-gray-500`}
    >
      {children}
    </span>
  );
};

export default StatusPill;
