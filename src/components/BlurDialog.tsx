import { FC, ReactNode } from "react";

interface BlurDialogProps {
  children: ReactNode;
  width: string;
}
const BlurDialog: FC<BlurDialogProps> = ({ children, width }) => {
  return (
    <div className="h-[100vh] w-[100vw] fixed z-[10000] bg-[#00000050] flex items-center justify-center">
      <div className={`bg-white rounded-2xl p-3 sm:p-6 font-lexend`} style={{ width }}>
        {children}
      </div>
    </div>
  );
};

export default BlurDialog;
