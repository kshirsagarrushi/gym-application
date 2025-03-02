import React, { useEffect, useState } from "react";
import Workouts from "../components/Workouts";
import { Workout } from "../components/Workouts";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BlurDialog from "../components/BlurDialog";
import LeaveFeedbackModal from "../components/LeaveFeedbackModal";
import getCoachWorkouts from "../services/getCoachWorkouts";
import { CircularProgress } from "@mui/material";
import NotAvailable from "../assets/icons/NotAvailable";

const CoachWorkouts: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<Workout[]>([]);
  const coach = useSelector((state: RootState) => state.coach);
  const [blurDialog, setBlurDialog] = useState<boolean>(false);
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchWorkouts = async () => {
      const workouts = await getCoachWorkouts(token);
      setPageLoad(false);
      if (workouts?.error) {
        setWorkoutData([]);
      } else {
        setWorkoutData(workouts?.data);
      }
    };
    fetchWorkouts();
  }, [refetch]);
  return (
    <div>
      {blurDialog && (
        <BlurDialog width="500px">
          {coach.firstName ? (
            <LeaveFeedbackModal
              client={false}
              coachData={selectedWorkout}
              setBlurDialog={setBlurDialog}
              setRefetch={setRefetch}
              refetch={refetch}
            />
          ) : null}
        </BlurDialog>
      )}
      <Navbar />
      <SubHeader />
      {pageLoad ? (
        <div className="min-h-[70vh] w-full flex justify-center items-center">
          <CircularProgress size={"30px"} />
        </div>
      ) : workoutData.length > 0 ? (
        <Workouts
          setSelectedWorkout={setSelectedWorkout}
          setBlurDialog={setBlurDialog}
          workoutData={workoutData}
          setRefetch={setRefetch}
          refetch={refetch}
          client={true}
        />
      ) : (
        <div className="flex justify-center">
          <NotAvailable />
        </div>
      )}
    </div>
  );
};

export default CoachWorkouts;
