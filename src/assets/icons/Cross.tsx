import { FC } from "react";

interface CrossProps {
  height?: string;
}
const Cross: FC<CrossProps> = ({ height }) => {
  return (
    <div>
      <svg
        width={height || "20"}
        height={height || "20"}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 5.00004L5.00004 15M5 5L15 15"
          stroke="#323A3A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
};

export default Cross;
