import { FC } from "react";

interface ArrowExtraProps {
  color?: string;
}
const ArrowExtra: FC<ArrowExtraProps> = ({ color }) => {
  return (
    <div>
      <svg
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L6 6L1 1"
          stroke={color || "#4B5563"}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default ArrowExtra;
