import { useEffect, useRef, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import Navbar from "../components/Navbar";
import {
  activityArr,
  coachArray,
  CoachInterface,
  timeArray,
} from "../helpers/Data";
import Calendar from "../components/Calendar";
import avatar from "../assets/Avatar.png";
import CalenderIcon from "../assets/icons/CalenderIcon";
import Clock from "../assets/icons/Clock";
import Dumbell from "../assets/icons/Dumbell";
import Star from "../assets/icons/Star";
import ArrowDown from "../assets/icons/ArrowDown";
import ArrowUp from "../assets/icons/ArrowUp";
import CoachCard from "../components/CoachCard";
import NotAvailable from "../assets/icons/NotAvailable";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BlurDialog from "../components/BlurDialog";
import Cross from "../assets/icons/Cross";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import filterWorkout from "../services/filterWorkout";
import formatDateTime from "../helpers/formatDate";
import bookWorkout from "../services/bookWorkout";
import { CircularProgress } from "@mui/material";
import SubHeader from "../components/SubHeader";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import getAllCoachesNames from "../services/getAllCoachesNames";

export interface CoachIdNames {
  firstName?: string;
  lastName?: string;
  coachId?: number;
  email?: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [allCoaches, setAllCoaches] = useState<CoachIdNames[]>([
    { firstName: "All", lastName: "" },
  ]);
  const [sport, setSport] = useState<string>(activityArr[0]);
  const [time, setTime] = useState<string>(timeArray[0]);
  const [coach, setCoach] = useState<string>(
    `${coachArray[0].firstName} ${coachArray[0].lastName}`
  );
  const [coachId, setCoachId] = useState<number>();
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [date, setDate] = useState<string>(
    formattedDate.toString().replace(",", "")
  );
  const [resultArr, setResultArr] = useState<any>(null);
  const client = useSelector((state: RootState) => state.client);
  const [blurDialog, setBlurDialog] = useState<boolean>(false);
  const [bookingLoad, setBookingLoad] = useState<boolean>(false);
  const [workoutLoad, setWorkoutLoad] = useState<boolean>(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachInterface>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [displaySport, setDisplaySport] = useState<string>("");
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });

  const filteringWorkout = async () => {
    setWorkoutLoad(true);
    const response = await filterWorkout({
      sport,
      time,
      date,
      coach: coachId,
    });
    if (response?.error) {
      setDialog({
        message: response.message || "Something went wrong pleaase try again later",
        status: false,
      });
      setResultArr([]);
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
    } else {
      setDisplaySport(sport);
      setResultArr(response.data);
    }
    setWorkoutLoad(false);
  };

  const token = localStorage.getItem("token");
  const bookingWorkout = async () => {
    setBookingLoad(true);
    const response: any = await bookWorkout(
      {
        coachEmail: selectedCoach?.email || "",
        date: selectedCoach?.date.split("T")[0] || "",
        workoutType: selectedCoach?.specialization || "",
        timeSlot: time,
      },
      token
    );
    if (response.error) {
      setDialog({
        message: response.message,
        status: false,
      });
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
      setBlurDialog(false);
    } else {
      navigate("/clientworkouts?success=true");
    }
    setBookingLoad(false);
  };

  const isFetched = useRef(false);
  useEffect(() => {
    const fetchCoaches = async () => {
      if (isFetched.current) return;

      const response = await getAllCoachesNames();
      if (response.error) {
        setAllCoaches(coachArray);
      } else {
        setAllCoaches(() => [
          { firstName: "All", lastName: "" },
          ...response.data,
        ]);
      }

      setPageLoad(false);
      isFetched.current = true;
    };

    fetchCoaches();
  }, []);

  useEffect(() => {
    const matchedCoach = allCoaches.find(
      (each) => `${each.firstName} ${each.lastName}` === coach
    );
    setCoachId(matchedCoach?.coachId || 0);
  }, [coach]);

  return (
    <div className="min-h-[100vh]" onClick={() => setOpenCalendar(false)}>
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
      />
      {blurDialog && (
        <BlurDialog width="530px">
          {client.firstName ? (
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
                    src={selectedCoach?.profilePicture || avatar}
                    className="w-[4.5rem] h-[4.5rem] rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement; // Type assertion
                      target.src = avatar; // Set fallback avatar
                    }}
                  />
                  <div className="text-[#4B5563] flex flex-col justify-between max-h-[4.5rem]">
                    <div>
                      <div className=" font-semibold text-[0.95rem]">
                        {`${selectedCoach?.firstName} ${selectedCoach?.lastName}`}
                      </div>
                      <div className=" font-light text-[0.75rem]">
                        {selectedCoach?.title}
                      </div>
                    </div>
                    <div className="flex gap-1 font-light text-[0.8rem]">
                      {selectedCoach?.ratings}
                      <Star />
                    </div>
                  </div>
                </div>
                <div className="text-[0.8rem] space-y-1.5">
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Dumbell /> <span className=" font-semibold">Type:</span>
                    {/* {selectedCoach?.specialization} */}
                    {displaySport}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <Clock />
                    <span className=" font-semibold">Time:</span>
                    {selectedCoach?.duration}
                  </div>
                  <div className="flex gap-2 text-[#4B5563] font-light">
                    <CalenderIcon />{" "}
                    <span className=" font-semibold">Date:</span>
                    {formatDateTime(selectedCoach?.date || "")}
                  </div>
                </div>
              </div>
              <Button
                text={
                  bookingLoad ? <CircularProgress size={"20px"} /> : "Confirm"
                }
                onSubmit={() => bookingWorkout()}
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
      <SubHeader />
      {pageLoad ? (
        <div className="min-h-[70vh] w-full flex justify-center items-center">
          <CircularProgress size={"30px"} />
        </div>
      ) : (
        <>
          <div className="text-[#323A3A] font-lexend font-semibold text-[1.3rem] sm:text-[2.7rem] sm:leading-[72px] my-6 px-2 sm:px-8">
            <div className="flex gap-2 sm:gap-4">
              Achieve your{" "}
              <div className="flex flex-col items-start sm:gap-1">
                fitness goals!{" "}
                <span className="bg-[#9EF300] h-[3px] w-full inline-block"></span>
              </div>
            </div>
            <div>Find a workout and book today. </div>
          </div>
          <div className="my-5 sm:my-12  px-2 sm:px-8 text-[#323A3A] font-lexend">
            <div>BOOK A WORKOUT</div>
            <div className="grid sm:grid-cols-5 items-center gap-3 py-2">
              <CustomDropdown
                label="Type of sport"
                menuItems={activityArr}
                setOuterTarget={setSport}
              />
              <div
                className="relative cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCalendar(!openCalendar);
                }}
              >
                <div className=" border-[1.5px] border-[#cbcbcb] rounded-md p-4">
                  <label className="absolute left-4 -top-2.5 px-2 font-light text-[0.8rem] bg-white text-[#4B5563]">
                    Date
                  </label>
                  <div className="flex justify-between">
                    <p className="text-[#323A3A] font-light text-[14px]">
                      {date.split(" ").slice(0, 2).join(" ")}
                    </p>
                    {openCalendar ? <ArrowUp /> : <ArrowDown />}
                  </div>
                </div>
                {openCalendar && (
                  <div className="absolute z-[10]">
                    <Calendar setDate={setDate} date={date} />
                  </div>
                )}
              </div>
              <CustomDropdown
                label="Time"
                menuItems={timeArray}
                setOuterTarget={setTime}
              />
              <CustomDropdown
                label="Coach"
                menuItems={allCoaches.map(
                  (coach) => `${coach.firstName} ${coach.lastName}`
                )}
                setOuterTarget={setCoach}
              />
              <Button
                text={
                  workoutLoad ? (
                    <CircularProgress size={"20px"} />
                  ) : (
                    "Find Workout"
                  )
                }
                onSubmit={() => filteringWorkout()}
              />
            </div>
          </div>
          {resultArr ? (
            resultArr.length > 0 ? (
              <div className="px-2 sm:px-8 my-10 space-y-6">
                <div className="font-lexend text-[#323A3A] ">
                  AVAILABLE WORKOUTS{" "}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 ">
                  {resultArr.map((item: CoachInterface) => (
                    <CoachCard
                      profilePicture={item.profilePicture}
                      name={`${item.firstName} ${item.lastName}`}
                      title={item.title}
                      rating={item.ratings}
                      summary={item.summary}
                      // type={item?.specialization}
                      type={displaySport}
                      time={"1h"}
                      date={formatDateTime(item.date)}
                      timeArr={item.timeArray.slice(0, 3)}
                      coachId={item.coachId}
                      onSubmit={() => {
                        setSelectedCoach({
                          ...item,
                          date: item.date,
                          // specialization: item.specialization,
                          specialization: displaySport,
                          duration: "1h",
                        });
                        setBlurDialog(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <NotAvailable />
              </div>
            )
          ) : null}
        </>
      )}
    </div>
  );
};

export default Home;
