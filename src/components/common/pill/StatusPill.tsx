import getRandomAccent from "@/utils/getRandomAccentColor";
import { useMemo } from "react";

const StatusPill = ({ children }: { children: React.ReactNode }) => {
  const getAccentColors = useMemo(() => getRandomAccent(), []);
  return (
    <span
      className={`${getAccentColors} rounded-2xl px-2 py-1 text-xs font-medium`}
    >
      {children}
    </span>
  );
};

export default StatusPill;
