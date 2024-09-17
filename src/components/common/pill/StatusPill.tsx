import XmarkIcon from "@/icons/XmarkIcon";
import { Tag } from "@/types/task";
import getRandomAccent from "@/utils/getRandomAccentColor";
import React, { useMemo } from "react";

const colorCache: { [key: string]: string } = {};

const getColorForTag = (tag: string) => {
  if (!colorCache[tag]) {
    colorCache[tag] = getRandomAccent();
  }
  return colorCache[tag];
};

const StatusPill = React.memo(
  ({
    children,
    removeTag,
  }: {
    children: React.ReactNode;
    removeTag?: (tag: Tag) => void;
  }) => {
    const accentColors = useMemo(
      () => getColorForTag(children as string),
      [children]
    );

    return (
      <span
        className={`${accentColors} relative rounded-2xl px-2 py-1 text-xs font-medium flex gap-2`}
      >
        {children}
        {!!removeTag && (
          <span
            className="cursor-pointer text-slate-400 bg-light rounded-full absolute -right-2 bottom-4 p-1"
            onClick={() => removeTag(children as Tag)}
          >
            <XmarkIcon />
          </span>
        )}
      </span>
    );
  }
);

export default StatusPill;
