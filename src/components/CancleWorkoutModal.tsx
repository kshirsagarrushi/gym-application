import React, { ReactNode } from "react";
import closeIcon from "../assets/close_icon.svg";
import { CircularProgress } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  cancelWorkout: () => void;
  loading: boolean;
}

const CancelWorkoutModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  cancelWorkout,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div
      data-testid="cancel"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-[#00000010] bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-6 mx-auto relative w-full max-w-[35.5rem] h-auto pt-6 gap-[2rem] rounded-xl border border-gray-300 opacity-1 font-lexend font-medium text-[1.25rem] flex flex-col sm:h-[15.25rem]">
        {children}
        <div className="flex flex-col gap-[2rem]">
          <div className="flex justify-between items-center">
            <h1 data-testid="modal-header">Cancel Workout</h1>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              data-testid="close-button"
            >
              <img src={closeIcon} alt="close_icon" className="w-4 h-4" />
            </button>
          </div>
          <div className="font-lexend font-light text-[0.9rem]">
            <p>
              You're about to mark this workout as canceled. Are you sure you
              want to cancel this session? Any progress or data from this
              workout will not be saved.
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-auto">
          <div className="flex gap-[1rem]">
            <button
              className="py-[0.5rem] px-[1rem] bg-transparent text-normal text-[#323A3A] text-normal text-[0.9rem] border border-[#323A3A] rounded-[0.5rem]"
              onClick={onClose}
              data-testid="resume-button"
            >
              Resume Workout
            </button>
            <button
              className="py-[0.5rem] px-[1rem] rounded-[0.5rem] text-normal bg-[#9EF300] text-[#323A3A] text-[0.9rem] min-w-[150px] flex items-center justify-center"
              onClick={cancelWorkout}
              data-testid="cancel-button"
            >
              {loading ? <CircularProgress size={"20px"} /> : "Cancel Workout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelWorkoutModal;
