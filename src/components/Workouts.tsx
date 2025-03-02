import React, { useState } from "react";
import WorkoutStatusCard from "./WorkoutStatusCard";
import CancelWorkoutModal from "./CancleWorkoutModal";
import cancelClientWorkout from "../services/cancelClientWorkout";
import SuccessFaliureDialog from "./SuccessFaliureDialog";
import cancelCoachWorkout from "../services/cancelCoachWorkout";
import formatDateTime4 from "../helpers/formateDate4";

export interface Workout {
  workoutType: string;
  workout_id: number;
  description: string;
  date: string;
  status: string;
  timeSlot: string;
  clientName?:string;
  coachName?:string;

}

interface WorkoutProps {
  workoutData: Workout[];
  setBlurDialog: (arg0: boolean) => void;
  setSelectedWorkout: React.Dispatch<React.SetStateAction<Workout | null>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: boolean;
  client?: boolean;
}

const Workouts: React.FC<WorkoutProps> = ({
  workoutData,
  setBlurDialog,
  setSelectedWorkout,
  setRefetch,
  refetch,
  client,
}) => {
  const [isCancelWorkoutModalOpen, setIsCancelWorkoutModalOpen] =
    useState(false);
  const openCancelWorkoutModal = () => {
    setIsCancelWorkoutModalOpen(true);
  };

  const closeCancelWorkoutModal = () => {
    setIsCancelWorkoutModalOpen(false);
  };
  const [selectedId, setSelectedId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });
  const [FilteredWorkoutData, setFilteredWorkoutData] =
    useState<Workout[]>(workoutData);

  const token = localStorage.getItem("token");
  const cancelWorkout = async () => {
    let response;
    setLoading(true);
    if (client) {
      response = await cancelCoachWorkout(selectedId, token);
    } else {
      response = await cancelClientWorkout(selectedId, token);
    }
    setLoading(false);
    setDialogOpen(true);
    if (response?.error) {
      setDialog({
        status: false,
        message: response.message,
      });
    } else {
      setDialog({
        status: true,
        message: response?.data,
      });
    }
    closeCancelWorkoutModal();
    setRefetch(!refetch);
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filteredData = workoutData.filter(
      (workout) => workout.status === e.target.value || e.target.value === "All"
    );
    setFilteredWorkoutData(filteredData);
  };

  return (
    <div className=" px-4 py-8">
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
      />
      <div className="p-2 mb-4 font-lexend w-[fit-content]">
        <label className="flex gap-2">
          Filter :
          <select onChange={handleChange} className="border-gray-500 border-2">
            <option value="All">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Waiting for Feedback">Waiting for Feedback</option>
            <option value="Finished">Finished</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {FilteredWorkoutData.sort((b,a) => {
     
          if (a.date !== b.date) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }

          const timeA = a.timeSlot.split("-")[0]; 
          const timeB = b.timeSlot.split("-")[0]; 

          return timeA.localeCompare(timeB); 
        }).map((workout, index) => (
          <>
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 justify-center"
              onClick={() => {
                setSelectedWorkout(workout);
                setSelectedId(workout.workout_id);
              }}
            >
              <WorkoutStatusCard
                type={workout.workoutType}
                description={workout.description}
                date={formatDateTime4(workout.date)}
                timeSlot={workout.timeSlot}
                Name={client?workout.clientName:workout.coachName}
                role={client?"Client":"Coach"}
                status={workout.status}
                openCancelWorkoutModal={openCancelWorkoutModal}
                setBlurDialog={setBlurDialog}
              />
            </div>
            <CancelWorkoutModal
              isOpen={isCancelWorkoutModalOpen}
              onClose={closeCancelWorkoutModal}
              cancelWorkout={() => cancelWorkout()}
              loading={loading}
            >
              <div className="w-[34.5rem] h-[15.25rem] absolute top-[20.5rem] left-[27.75rem] pt-6 gap-[2.5rem] rounded-tl-lg border-t border-l-0 border-r-0 border-b-0 opacity-0"></div>
            </CancelWorkoutModal>
          </>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
