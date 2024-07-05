"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  percentage: number;
  bgColor: string;
  accentColor: string;
  size: number;
  padding: number;
};

export default function Progress({
  percentage,
  bgColor,
  accentColor,
  size,
  padding,
}: Props) {
  return (
    <div
      style={{ backgroundColor: bgColor, padding: `${padding}px` }}
      className="rounded-full w-fit"
    >
      <div
        style={{ backgroundColor: accentColor, padding: `${padding}px` }}
        className="rounded-full"
      >
        <div style={{ width: size, height: size }}>
          <CircularProgressbar
            value={percentage}
            strokeWidth={50}
            styles={{
              path: {
                stroke: bgColor,
                strokeLinecap: "butt",
                transformOrigin: "center center",
              },
              trail: {
                stroke: accentColor,
                strokeLinecap: "butt",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
