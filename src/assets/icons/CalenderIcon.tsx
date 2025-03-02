import { FC } from "react";

interface CalenderIconProps {
  size?: string;
  color?: string;
}
const CalenderIcon: FC<CalenderIconProps> = ({ size, color }) => {
  return (
    <div>
      <svg
        width={size || "14"}
        height={size || "14"}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.3335 1.33325V3.99992"
          stroke={color || "#B7B6B6"}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.6665 1.33325V3.99992"
          stroke={color || "#B7B6B6"}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.6667 2.66675H3.33333C2.59695 2.66675 2 3.2637 2 4.00008V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V4.00008C14 3.2637 13.403 2.66675 12.6667 2.66675Z"
          stroke={color || "#B7B6B6"}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 6.66675H14"
          stroke={color || "#B7B6B6"}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 10.6666L7.33333 11.9999L10 9.33325"
          stroke={color || "#B7B6B6"}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default CalenderIcon;
