import { FC, ReactNode } from "react";

interface ButtonProps {
  text: string | ReactNode;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  backroundColor?: string;
  textColor?: string;
  bold?: boolean;
  border?: boolean;
  padding?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  onSubmit,
  backroundColor,
  textColor,
  bold,
  border,
  padding,
}) => {
  return (
    <button
      className={`w-full ${
        backroundColor ? `bg-[${backroundColor}]` : "bg-[#9EF300]"
      } ${
        textColor ? `text-[${textColor}]` : "text-[#323A3A]"
      } flex justify-center ${
        padding ? "py-2.5" : "py-4"
      } my-3 items-center rounded-[8px] font-lexend text-[0.9rem] ${
        bold ? " font-bold" : "font-medium "
      } ${border ? "border-[1px] border-[#323A3A]" : ""}`}
      onClick={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
