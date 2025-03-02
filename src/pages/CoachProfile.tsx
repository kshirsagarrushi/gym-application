import React, { useEffect, useState } from "react";
import PDF from "../assets/PDF.svg";
import ShowFeedbackList from "../components/ShowFeedbackList";
import FeedbackPagination from "../components/FeedbackPagination";
import ProfileCalendar from "../components/ProfileCalendar";
import Navbar from "../components/Navbar";
import getCoachProfileById from "../services/getCoachProfileById";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import avatar from "../assets/SignUpImage.png";
import bookWorkout from "../services/bookWorkout";
import { CircularProgress } from "@mui/material";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import Star from "../assets/icons/Star";
import Clock from "../assets/icons/Clock";
import CalenderIcon from "../assets/icons/CalenderIcon";
import Cross from "../assets/icons/Cross";
import Dumbell from "../assets/icons/Dumbell";
import BlurDialog from "../components/BlurDialog";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NotAvailableFeedback from "../assets/NotAvailableFeedback.tsx";

interface Feedback {
  date: string;
  clientName: string;
  imageURL: string;
  rating: string;
  text: string;
}

interface Slot {
  time: string[];
}

export interface Slots {
  [key: string]: Slot;
}

export interface Booking {
  date: string;
  duration: string;
  time: string;
  type: string;
}

interface CoachProfile {
  email: string;
  about: string;
  certificates: string[];
  coachId: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  ratings: number;
  specialization: string;
  summary: string;
  title: string;
  workoutDescription: string;
  feedbacks: Feedback[];
  availableSlots: Slots;
  bookings: Booking[];
}

const CoachProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 3;
  const [coachProfile, setCoachProfile] = useState<CoachProfile | undefined>();
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("MMMM D YYYY")
  ); // Set current date as initial date
  const [open, setOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: error,
  });
  const [blurDialog, setBlurDialog] = useState<boolean>(false);
  const [bookingLoad, setBookingLoad] = useState<boolean>(false);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("");
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null
  );
  const client = useSelector((state: RootState) => state.client);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { coachId } = useParams();
  useEffect(() => {
    const fetchCoachProfile = async () => {
      try {
        if (coachId) {
          const data: any = await getCoachProfileById(parseInt(coachId, 10));
          setCoachProfile(data);
        } else {
          setError("Coach ID not provided");
        }
      } catch {
        setError("Failed to fetch coach profile");
      }
    };

    fetchCoachProfile();
  }, [coachId]);

  const handleBookWorkout = async () => {
    setBookingLoad(true);
    const request = {
      coachEmail: coachProfile?.email || "",
      date: dayjs(`${selectedDate}`, "MMMM D YYYY").format("YYYY-MM-DD"),
      workoutType: coachProfile?.specialization || "Yoga",
      timeSlot: selectedSlotTime,
    };
    const response: any = await bookWorkout(request, token);

    if (response.error) {
      setDialog({
        message: response.message,
        status: false,
      });
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
      setBlurDialog(false);
    } else {
      navigate("/clientworkouts?success=true");
    }
    setBookingLoad(false);
  };

  if (!coachProfile) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const lastIndex = currentPage * feedbacksPerPage;
  const firstIndex = lastIndex - feedbacksPerPage;
  const currentFeedbacks = coachProfile.feedbacks.slice(firstIndex, lastIndex);

  const convertTimeFormat = (timeString: string) => {
    const temp = timeString.split("-");
    return temp[0];
  };

  const sortBookings = (bookings: any) => {
    return bookings.sort((a, b) => {
      // Combine date and time into one dayjs object for comparison
      const dateTimeA = dayjs(
        `${a.date} ${a.time.split("-")[0]}`,
        "YYYY-MM-DD HH:mm"
      );
      const dateTimeB = dayjs(
        `${b.date} ${b.time.split("-")[0]}`,
        "YYYY-MM-DD HH:mm"
      );

      return dateTimeA.isBefore(dateTimeB)
        ? -1
        : dateTimeA.isAfter(dateTimeB)
        ? 1
        : 0;
    });
  };
  const sortedBookings = sortBookings(coachProfile.bookings);

  return (
    <>
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setOpen}
        open={open}
      />
      {blurDialog && (
        <BlurDialog width="530px">
          {client && client.firstName ? (
            <>
              <div className="flex justify-between ">
                <div>
                  <div className="font-semibold text-[1.3rem]">
                    Confirm your booking
                  </div>
                  <div className="text-[#323A3A] font-normal my-1 text-[0.8rem]">
                    Please double-check your workout details.
                  </div>
                </div>
                <div
                  className="cursor-pointer py-3"
                  onClick={() => setBlurDialog(false)}
                >
                  <Cross />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between my-6">
                <div className="flex gap-3">
                  <img
                    src={coachProfile?.profilePicture || avatar}
                    className="w-[4.5rem] h-[4.5rem] rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = avatar;
                    }}
                  />
                  <div className="text-[#4B5563] flex flex-col justify-between max-h-[4.5rem]">
                    <div>
                      <div className=" font-semibold text-[0.95rem]">
                        {`${coachProfile?.firstName} ${coachProfile?.lastName}`}
                      </div>
                      <div className=" font-light text-[0.75rem]">
                        {coachProfile?.title}
                      </div>
                    </div>
                    <div className="flex gap-1 font-light text-[0.8rem]">
                      {coachProfile?.ratings}
                      <Star />
                    </div>
                  </div>
                </div>
                <div className="text-[0.8rem] space-y-1.5">
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Dumbell /> <span className=" font-semibold">Type:</span>
                    {coachProfile?.specialization}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Clock />
                    <span className=" font-semibold">Time:</span>
                    {`1h`}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <CalenderIcon />{" "}
                    <span className=" font-semibold">Date:</span>
                    {`${dayjs(selectedDate, "MMMM D YYYY").format(
                      "MMM D"
                    )},${convertTimeFormat(selectedSlotTime)}`}
                  </div>
                </div>
              </div>
              <Button
                text={
                  bookingLoad ? <CircularProgress size={"20px"} /> : "Confirm"
                }
                onSubmit={handleBookWorkout}
              />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-[1.3rem]">
                  Log in to book workout
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setBlurDialog(false)}
                >
                  <Cross />
                </div>
              </div>
              <div className="text-[#323A3A] font-normal my-[1.3rem] text-[0.8rem]">
                You must be logged in to book a workout. Please log in to access
                available slots and book your session.
              </div>
              <div className="flex justify-end">
                <div className="w-[50%] flex gap-4">
                  <Button
                    padding={true}
                    text="Cancel"
                    border={true}
                    backroundColor="transparent"
                    onSubmit={() => setBlurDialog(false)}
                  />
                  <Button
                    padding={true}
                    text="Log In"
                    onSubmit={() => navigate("/signin")}
                  />
                </div>
              </div>
            </>
          )}
        </BlurDialog>
      )}
      <Navbar />
      <div className=" px-6 flex gap-1 py-1 ml-2">
        <span
          className="font-lexend font-normal cursor-pointer"
          onClick={() => navigate("/coaches")}
        >
          Coaches
        </span>
        <span>{`>`}</span>
        <span>{`${coachProfile.firstName} ${coachProfile.lastName}`}</span>
      </div>
      <div
        id="maindiv"
        className="flex w-full h-full  font-lexend flex-col sm:flex-row"
      >
        <div
          id="profilediv"
          className="flex w-full sm:w-1/3 md:w-1/4 lg:w-1/5 bg-white flex-col text-black p-5 min-w-[360px]"
        >
          <img
            className="rounded-t-lg"
            src={coachProfile.profilePicture}
            alt="coach-profile-img"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = avatar;
            }}
          />
          <div className="flex flex-col p-2 gap-2">
            <div className="flex justify-between gap-10">
              <div>
                <h1 className="font-[500] text-xl">{`${coachProfile.firstName} ${coachProfile.lastName}`}</h1>
                <p className="text-gray-600 text-sm">{coachProfile.title}</p>
              </div>
              <div>{coachProfile.ratings}⭐</div>
            </div>
            <div className="max-h-[500px] flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <h3 className="font-[500]">About coach</h3>
                <p className="text-gray-600 leading-[20px]">
                  {coachProfile.about}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <h3 className="font-[500] m-1">Specialization</h3>
                <div className="flex flex-wrap gap-2 p-2">
                  <span className="bg-gray-200 px-2 py-1 rounded-md text-gray-600">
                    {coachProfile.specialization}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-[500]">Certificates</h3>
                <div className="flex flex-wrap gap-4">
                  {coachProfile.certificates.map(
                    (
                      value:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => {
                      return (
                        <div
                          key={index}
                          className="bg-[#F6FFE5] px-2 rounded-md text-sm flex gap-1 text-gray-800 underline decoration-solid"
                        >
                          <img src={PDF} alt="pdf-img" /> {value}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="slotnrdiv"
          className="flex flex-col w-full sm:w-2/3 md:w-3/4 lg:w-4/5 overflow-hidden p-5 font-lexend max-[375px]:mt-[3rem]"
        >
          <div>
            <div>SCHEDULE</div>
            <div
              id="firsthalfdiv"
              className="flex flex-col sm:flex-row max-md:flex-col"
            >
              <div className="flex-1">
                <ProfileCalendar
                  setDate={setSelectedDate}
                  date={selectedDate}
                  availableDates={coachProfile.availableSlots}
                  upcomingworkouts={coachProfile.bookings}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[4em] flex justify-around items-center">
                  <span className="text-[#323A3A]">
                    {dayjs(selectedDate, "MMMM D YYYY").format("MMM D")}
                  </span>
                  <span className="text-[#909090]">
                    {coachProfile.availableSlots[
                      dayjs(selectedDate, "MMMM D YYYY").format("YYYY-MM-DD")
                    ]?.time.length || 0}{" "}
                    slots available
                  </span>
                </div>
                <hr className="m-1" />
                <div className="max-h-[10em] h-[10em] overflow-auto">
                  {coachProfile.availableSlots[
                    dayjs(selectedDate, "MMMM D YYYY").format("YYYY-MM-DD")
                  ]?.time
                    .sort((a, b) => {
                      const startA = a.split("-")[0];
                      const startB = b.split("-")[0];
                      return startA.localeCompare(startB);
                    })
                    .map((time, i) => (
                      <div
                        className={`flex justify-center items-center w-full text-center h-[4em] mt-2 py-4 bg-[#F6FFE5] cursor-pointer ${
                          selectedSlotIndex === i
                            ? "border-2 border-[#9ef300]"
                            : ""
                        }`}
                        key={i}
                        onClick={() => {
                          setSelectedSlotTime(time);
                          setSelectedSlotIndex(i);
                        }}
                      >
                        <span>{time}</span>
                      </div>
                    ))}
                </div>
                <div className="pt-2">
                  <Button
                    text="Book workout"
                    onSubmit={() => setBlurDialog(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 font-lexend ">
            <h1>UPCOMING WORKOUTS</h1>
            {sortedBookings.length > 0 ? (
              sortedBookings.slice(0, 2).map((booking, index) => {
                return (
                  <div className="mt-2 flex" key={index}>
                    <div className="w-[1.5%] bg-blue-400 rounded-l-lg"></div>
                    <div className="flex px-5 py-5 w-full bg-[#18A0FB] bg-opacity-5 justify-between">
                      <div className="flex gap-5 p-2">
                        <h1
                          className="font-500
                     text-gray-900"
                        >
                          {booking.type}
                        </h1>
                        <span className="text-gray-700">
                          {dayjs(booking.date, "YYYY MM DD").format("MMM D")}
                          {" , "}
                          {booking.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        🕒 {booking.duration}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-2 text-gray-500">
                No upcoming workouts scheduled.
              </div>
            )}
          </div>
          <div className="mt-5">
            <h1>FEEDBACK</h1>
            {currentFeedbacks.length > 0 ? (
              <>
                <div className="py-4">
                  <ShowFeedbackList currentFeedbacks={currentFeedbacks} />
                </div>
                <div className="pt-2">
                  <div className="py-9 flex justify-center">
                    <FeedbackPagination
                      totalFeedbacks={coachProfile.feedbacks.length}
                      feedbacksPerPage={feedbacksPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </div>
                </div>
              </>
            ) : (
              <NotAvailableFeedback />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
