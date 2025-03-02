import React, { useEffect, useState } from "react";
import Workouts from "../components/Workouts";
import { Workout } from "../components/Workouts";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";
import BlurDialog from "../components/BlurDialog";
import LeaveFeedbackModal from "../components/LeaveFeedbackModal";
import getClientWorkouts from "../services/getClientWorkouts";
import { CircularProgress } from "@mui/material";
import NotAvailable from "../assets/icons/NotAvailable";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import { useSearchParams } from "react-router-dom";

const ClientWorkouts: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<Workout[]>([]);
  const [blurDialog, setBlurDialog] = useState<boolean>(false);
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });

  const token = localStorage.getItem("token");
  const [params] = useSearchParams();
  const success = params.get("success");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workouts = await getClientWorkouts(token);
      setPageLoad(false);
      if (workouts?.error) {
        setWorkoutData([]);
      } else {
        setWorkoutData(workouts?.data);
      }
    };
    console.log("inside useeffect",refetch);
    fetchWorkouts();
    setPageLoad(true);
  }, [refetch]);

  useEffect(() => {
    if (success) {
      setDialog({
        message: "Booking Successfull",
        status: true,
      });
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
    }
  }, [success]);
  return (
    <div>
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
      />
      {blurDialog && (
        <BlurDialog width="auto">
          {selectedWorkout ? (
            <LeaveFeedbackModal
              coachData={selectedWorkout}
              setBlurDialog={setBlurDialog}
              client={true}
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
        />
      ) : (
        <div className="flex justify-center">
          <NotAvailable />
        </div>
      )}
    </div>
  );
};

export default ClientWorkouts;
