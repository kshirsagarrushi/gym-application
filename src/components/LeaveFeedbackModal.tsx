import React, { useState } from "react";
import Cross from "../assets/icons/Cross";
import Button from "./Button";
import Star from "../assets/icons/Star";
import CalenderIcon from "../assets/icons/CalenderIcon";
import Clock from "../assets/icons/Clock";
import Dumbell from "../assets/icons/Dumbell";
import avatar from "../assets/Avatar.png";
import Rating from "./Rating";
import { giveClientToCoachFeedback } from "../services/giveClientToCoachFeedback";
import { giveCoachToClientFeedback } from "../services/giveCoachToClientFeedback";
import { CircularProgress } from "@mui/material";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import formatDateTime4 from "../helpers/formateDate4";

interface WorkoutFeedbackProps {
  setBlurDialog: (arg0: boolean) => void;
  coachData: any;
  client?: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: boolean;
}

const LeaveFeedbackModal: React.FC<WorkoutFeedbackProps> = ({
  setBlurDialog,
  coachData,
  client,
  setRefetch,
  refetch
}) => {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  if (!coachData) {
    return <div>Loading...</div>;
  }

  const token = localStorage.getItem("token");

  const handleFeedback = async () => {
    if (!comment) {
      setDialogOpen(true);
      setDialog({ status: false, message: "Please give Feedback" });
      return;
    }
    setLoading(true);

    try {
      if (client) {
        if (!rating) {
          setDialogOpen(true);
          setDialog({ status: false, message: "Please give Rating" });
          setDialogOpen(false);
          return;
        }
        const feedbackData = {
          workout_id: coachData.workout_id,
          feedback: comment,
          rating: rating,
        };
        const response = await giveClientToCoachFeedback(token, feedbackData);
        handleFeedbackResponse(response);
      } else {
        const feedbackData = {
          workoutId: coachData.workout_id,
          feedbackText: comment,
          clientEmail: coachData.clientEmail,
        };
        const response = await giveCoachToClientFeedback(token, feedbackData);
        handleFeedbackResponse(response);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setDialog({
        status: false,
        message: "An error occurred while submitting feedback",
      });
    } finally {
      setLoading(false);
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
        setBlurDialog(false);
        console.log("refetch before",refetch);
        setRefetch(!refetch);
        console.log("refetch after",refetch);
      }, 3000);
    }
  };

  const handleFeedbackResponse = (response: any) => {
    if (response.error) {
      setDialog({
        status: false,
        message: response.message,
      });
    } else {
      setDialog({ status: true, message: "Feedback submitted successfully" });
    }
  };
  return (
    
    <div className="flex justify-center px-4 sm:px-0">
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
      />
      <div className="font-lexend flex flex-col gap-[2.5rem] w-full max-w-[28.5rem]">
        <div className="flex flex-col gap-[2.5rem]">
          <div className="flex flex-col h-16">
            <div className="flex justify-between items-stretch h-[2.5rem]">
              <h1 className="text-[1.5rem] text-[#1F2937] font-medium font-lexend">
                Workout Feedback
              </h1>
              <button onClick={() => setBlurDialog(false)}>
                <Cross />
              </button>
            </div>
            <p className="font-light font-lexend text-[#4B5563] text-[0.9rem]">
              Please rate your experience below
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:gap-1">
            <div className="flex gap-[0.5rem]">
              <div className="w-[5.5rem] h-[5.5rem]">
                <img
                  src={
                    client
                      ? coachData.coachProfileLink
                      : coachData.profilePictureLink || avatar
                  }
                  alt={client ? coachData.coachName : coachData.clientName}
                  className="rounded-full h-full object-cover mr-4 w-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = avatar;
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="p-2">
                  <h2 className="font-medium text-[1.1rem] text-[#4B5563]">
                    {client ? coachData.coachName : coachData.clientName}
                  </h2>
                  <p className="font-light text-[#4B5563] text-[0.9rem]">
                    {client ? coachData.coachTitle : coachData.clientTitle}
                  </p>
                </div>
                {client && (
                  <div className="flex gap-1 text-[#4B5563] font-light pl-2">
                    <span>{coachData.coachRating}</span>
                    <Star />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[0.3rem] mt-2 md:mt-0">
              <div className="flex gap-2 text-[#4B5563] font-light items-center">
                <Dumbell />{" "}
                <span className=" font-medium text-[0.9rem]">Type:</span>
                <p className="text-[0.85rem]">{coachData.workoutType}</p>
              </div>
              <div className="flex gap-2 text-[#4B5563] font-light items-center">
                <Clock />
                <span className=" font-medium text-[0.9rem]">Time:</span>
                <p className="text-[0.85rem]">1h</p>
              </div>
              <div className="flex gap-1 text-[#4B5563] font-light items-center mb-2">
                <CalenderIcon />{" "}
                <span className=" font-medium text-[0.9rem]">Date:</span>
                <p className="text-[0.85rem]">
                  {formatDateTime4(coachData.date)}{`  ${coachData.timeSlot.split("-")[0]}`}
                </p>
              </div>
            </div>
          </div>
          {client && (
            <div className="flex items-center justify-around text-[#6B7280] text-[0.9rem] h-[1.9rem]">
              <Rating rating={rating} onRatingChange={handleRatingChange} />
              <div>
                <p>{rating}/5 Star</p>
              </div>
            </div>
          )}
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md resize-y focus:outline-none"
            placeholder="Add your comments"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <Button
          text={
            loading ? <CircularProgress size={"20px"} /> : "Submit Feedback"
          }
          onSubmit={handleFeedback}
        />
      </div>
    </div>
  );
};

export default LeaveFeedbackModal;
