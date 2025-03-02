import React from "react";
import Calendar from "../assets/calendar.png";

interface WorkoutStatusCardProps {
  type: string;
  description: string;
  date: string;
  timeSlot: string;
  Name:string|undefined;
  role:string;
  status:
    | string
    | "Scheduled"
    | "Waiting for Feedback"
    | "Finished"
    | "Cancelled";
  openCancelWorkoutModal: () => void;
  setBlurDialog: (arg0: boolean) => void;
}

const WorkoutStatusCard: React.FC<WorkoutStatusCardProps> = ({
  type,
  description,
  date,
  status,
  timeSlot,
  Name,
  role,
  openCancelWorkoutModal,
  setBlurDialog,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "Scheduled":
        return "bg-[#4EB7FC] text-white";
      case "Waiting for Feedback":
        return "bg-[#6C6F80] text-white";
      case "Finished":
        return "bg-[#FDD63B] text-black";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getActionButton = () => {
    switch (status) {
      case "Scheduled":
        return (
          <button
            className="py-[0.5rem] px-[1rem] bg-transparent text-[#323A3A]-400 text-[0.9rem] border border-[#323232] rounded-[0.5rem]  font-lexend"
            onClick={openCancelWorkoutModal}
          >
            Cancel Workout
          </button>
        );
      case "Waiting for Feedback":
        return (
          <button
            className="py-[0.5rem] px-[1rem] bg-transparent text-[#323A3A]-400 text-[0.9rem] border border-[#323232] rounded-[0.5rem] font-lexend "
            onClick={() => setBlurDialog(true)}
          >
            Leave Feedback
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="col-span-1 h-auto p-6 flex flex-col gap-2 rounded-xl bg-white shadow-[0_0_11px_0_rgba(0,0,0,0.12)] xs:w-[320px] sm:w-[600px] md:w-[664px] lg:w-[500px]font-lexend space-y-1">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{type}</h2>
        <span
          className={`py-1 px-4 text-[0.9rem] font-lexend font-light rounded-full ${getStatusColor()}`}
        >
          {status}
        </span>
      </div>
      <p className="text-[#323A3A] text-[0.9rem] font-lexend font-normal">
        {description}
      </p>
      <div className="">
        <p className="text-[#323A3A] font-[650] text-[0.875rem] ">
          <img
            className="h-5 inline-block mr-2"
            src={Calendar}
            alt="calendar-img"
          />
          {date}
          {`  ${timeSlot.split("-")[0]}`}
        </p>
      </div>
      <div className="flex justify-between items-center font-lexend text-[0.9rem]">
        <p>{`${role}`} : {``}
          <span className="font-light">{Name}</span> </p>
        <div className="flex justify-end">{getActionButton()}</div>
      </div>
    </div>
  );
};

export default WorkoutStatusCard;
