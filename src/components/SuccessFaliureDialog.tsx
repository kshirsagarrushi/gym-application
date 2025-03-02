import { FC } from "react";
import GreenTick from "../assets/icons/GreenTick";
import RedCross from "../assets/icons/RedCross";
import Cross from "../assets/icons/Cross";

interface SuccessFaliureDialogProps {
  success: boolean;
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SuccessFaliureDialog: FC<SuccessFaliureDialogProps> = ({
  success,
  message,
  open,
  setOpen
}) => {
  return (
    open && (
      <div
        className={`h-max w-80 sm:w-[30rem] rounded-[8px] ${
          success ? "bg-[#F3F8E8]" : "bg-[#FEECEC]"
        } fixed z-30 top-6 sm:top-10 xl:top-12 left-1/2 transform -translate-x-1/2 py-2 px-2 flex gap-1 justify-between dialogbox`}
      >
        <div className="w-0.5/12">{success ? <GreenTick /> : <RedCross />}</div>
        <div className="w-10/12 font-lexend">
          <div className="">{success ? "Success" : "Error"}</div>
          <div className="text-[0.8rem]">{message}</div>
        </div>
        <div className="w-1.5/12" onClick={()=>setOpen(false)}>
          <Cross />
        </div>
      </div>
    )
  );
};

export default SuccessFaliureDialog;
