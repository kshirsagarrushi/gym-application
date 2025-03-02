import { useEffect, useRef, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";
import { activityArr, coachArray } from "../helpers/Data";
import ArrowUp from "../assets/icons/ArrowUp";
import ArrowDown from "../assets/icons/ArrowDown";
import { CoachIdNames } from "./Home";
import getAllCoachesNames from "../services/getAllCoachesNames";
import { CircularProgress } from "@mui/material";
import Button from "../components/Button";
import PlusCircle from "../assets/icons/PlusCircle";
import CalenderIcon from "../assets/icons/CalenderIcon";
import Profile from "../assets/icons/Profile";
import ArrowExtra from "../assets/icons/ArrowExtra";
import ReportCalendar from "../components/ReportCalendar";
import getAllReports from "../services/getAllReports";
import generateReport from "../services/generateReport";
import formatDate5 from "../helpers/formatDate5";
import getDetailedReport from "../services/getDetailedReport";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import downloadReport from "../services/downloadReport";
const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [detailReport, setDetailReport] = useState<any>();
  const [allReports, setAllReports] = useState([]);
  const [coach, setCoach] = useState<string>("All");
  const [coachId, setCoachId] = useState<number>(20);
  const [workoutType, setWorkoutType] = useState<string>("All");
  const [openStartCalendar, setOpenStartCalendar] = useState(false);
  const [openEndCalendar, setOpenEndCalendar] = useState(false);
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [allCoaches, setAllCoaches] = useState<CoachIdNames[]>([
    { firstName: "All", lastName: "" },
  ]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });
  const [detailIndex, setDetailIndex] = useState<number>(-1);
  const [downloadIndex, setDownloadIndex] = useState<number>(-1);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [startDate, setStartDate] = useState<string>(
    formattedDate.toString().replace(",", "")
  );
  const [endDate, setEndDate] = useState<string>(
    formattedDate.toString().replace(",", "")
  );
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
    const fetch = async () => {
      const response = await getAllReports(token);
      if (!response.error) {
        setAllReports(response.data);
      } else {
        setAllReports([]);
      }
    };
    fetch();
  }, []);

  const generateRep = async () => {
    const response = await generateReport(
      {
        coachId: coachId,
        startDate: formatDate5(startDate),
        endDate: formatDate5(endDate),
        specialization: workoutType,
      },
      token
    );
    if (!response?.error) {
      setDialogOpen(true);
      setDialog({ status: true, message: "Report generated successfully" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setDialogOpen(true);
      setDialog({
        status: false,
        message: response.message,
      });
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
    }
  };

  const [detailLoad, setDetailLoad] = useState<number>(-1);

  const getDetailRep = async (reportId: number, index: number) => {
    setDetailLoad(index);
    const response = await getDetailedReport(token, reportId);
    setDetailLoad(-1);
    if (!response.error) {
      setDetailLoad(-1);
      setDetailReport(response.data);
      setDetailIndex(index);
    } else {
      setDialogOpen(true);
      setDialog({
        status: false,
        message: "Failed to get detailed report, try again later",
      });
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
    }
  };

  useEffect(() => {
    if (coach) {
      if (coach === "All") {
        setCoachId(20);
        return;
      }
      const selected = allCoaches.find(
        (each) => `${each.firstName} ${each.lastName}` === coach
      );
      setCoachId(selected?.coachId || 20);
    }
  }, [coach]);

  const [downloadLoad, setDownloadLoad] = useState<string>("");
  const downloadRep = async (reportId: number, type: string) => {
    setDownloadLoad(type);
    const response = await downloadReport(token, reportId, type);
    setDownloadLoad("");
  };

  if (pageLoad) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
      />
      <Navbar />
      <SubHeader />
      <div className="mt-[4.5rem] h-[60vh] max-w-[100vw] px-2 sm:px-8">
        <div className="grid sm:grid-cols-5 items-center gap-3 py-2">
          <CustomDropdown
            label="Coach"
            menuItems={allCoaches.map(
              (coach) => `${coach.firstName} ${coach.lastName}`
            )}
            setOuterTarget={setCoach}
          />
          <CustomDropdown
            label="Session Type"
            menuItems={activityArr}
            setOuterTarget={setWorkoutType}
          />
          <div
            className="relative "
            onClick={(e) => {
              e.stopPropagation();
              setOpenStartCalendar(!openStartCalendar);
              if (openEndCalendar) {
                setOpenEndCalendar(false);
              }
            }}
          >
            <div className=" border-[1.5px] border-[#cbcbcb] rounded-md p-4">
              <label className="absolute left-4 -top-2.5 px-2 font-normal text-[0.8rem] bg-white text-[#4B5563]">
                Start Date
              </label>
              <div className="flex justify-between">
                <p className="text-[#323A3A] font-normal text-[14px]">
                  {startDate.split(" ").slice(0, 2).join(" ")}
                </p>
                {openStartCalendar ? <ArrowUp /> : <ArrowDown />}
              </div>
            </div>
            {openStartCalendar && (
              <div className="absolute z-[10]">
                <ReportCalendar setDate={setStartDate} date={startDate} />
              </div>
            )}
          </div>
          <div
            className="relative"
            onClick={(e) => {
              e.stopPropagation();
              setOpenEndCalendar(!openEndCalendar);
              if (openStartCalendar) {
                setOpenStartCalendar(false);
              }
            }}
          >
            <div className=" border-[1.5px] border-[#cbcbcb] rounded-md p-4">
              <label className="absolute left-4 -top-2.5 px-2 font-normal text-[0.8rem] bg-white text-[#4B5563]">
                End Date
              </label>
              <div className="flex justify-between">
                <p className="text-[#323A3A] font-normal text-[14px]">
                  {endDate.split(" ").slice(0, 2).join(" ")}
                </p>
                {openEndCalendar ? <ArrowUp /> : <ArrowDown />}
              </div>
            </div>
            {openEndCalendar && (
              <div className="absolute z-[10]">
                <ReportCalendar setDate={setEndDate} date={endDate} />
              </div>
            )}
          </div>
          <div>
            <Button
              backroundColor="#9EF300"
              text={
                <div className="flex gap-3">
                  <PlusCircle /> Generate Report
                </div>
              }
              onSubmit={() => generateRep()}
            />
          </div>
        </div>

        <div className="my-6 font-lexend">
          <div className="font-medium text-[#323A3A] px-6 my-4 text-[1.2rem]">
            You have {allReports.length} reports
          </div>
          {allReports.map((item: any, index) => (
            <div className="relative">
              <div className="border-[1px] border-[#00000050] text-[#323A3A] text-[0.9rem] font-medium rounded-md grid grid-cols-5 gap-5 px-3 items-center">
                <div className="flex gap-2 items-center">
                  <CalenderIcon size="20" color="#92cc28" />
                  {item.startDate} - {item.endDate}
                </div>
                <div>
                  {item.specialization == "all"
                    ? "All session types"
                    : item.specialization}
                </div>
                <div className="flex gap-2 items-center">
                  <Profile size="20" color="#92cc28" />
                  Coaches
                </div>
                <div>
                  <Button
                    backroundColor="transparent"
                    text={
                      <div className="flex gap-5 items-center">
                        Details report{" "}
                        {detailLoad === index ? (
                          <CircularProgress size={"20px"} />
                        ) : (
                          <ArrowExtra />
                        )}
                      </div>
                    }
                    onSubmit={() => {
                      if (detailIndex === index) {
                        setDetailIndex(-1);
                      } else {
                        getDetailRep(item.reportId, index);
                      }
                    }}
                    padding={true}
                    border={true}
                  />
                </div>
                <div className="relative">
                  <Button
                    backroundColor="transparent"
                    text={
                      <div className="flex gap-5 items-center">
                        Download <ArrowExtra />
                        {/* Download */}
                      </div>
                    }
                    onSubmit={() => {
                      if (downloadIndex == index) {
                        setDownloadIndex(-1);
                        return;
                      }
                      setDownloadIndex(index);
                    }}
                    padding={true}
                    border={true}
                  />
                  {downloadIndex == index && (
                    <div className="absolute bg-lime-100 font-lexend z-10 min-w-full rounded-xl cursor-pointer">
                      <div
                        className="py-2 px-4 border-[1px] flex justify-between items-center"
                        onClick={() => downloadRep(item.reportId, "pdf")}
                      >
                        Download in Pdf
                        {downloadLoad == "pdf" && (
                          <CircularProgress size={"10px"} />
                        )}
                      </div>
                      <div
                        className="py-2 px-4 border-[1px] flex justify-between items-center"
                        onClick={() => downloadRep(item.reportId, "csv")}
                      >
                        Download in Csv
                        {downloadLoad == "csv" && (
                          <CircularProgress size={"10px"} />
                        )}
                      </div>
                      <div
                        className="py-2 px-4 border-[1px] flex justify-between items-center"
                        onClick={() => downloadRep(item.reportId, "excel")}
                      >
                        Download in Excel
                        {downloadLoad == "excel" && (
                          <CircularProgress size={"10px"} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {detailIndex === index && (
                <div className=" w-full z-[100]">
                  {Object.entries(detailReport.reportData).map(
                    ([key, value1]: [string, any]) =>
                      value1.map((value: any) => (
                        <div
                          key={value.date}
                          className="w-full border-[1px] border-[#00000050] py-4 text-[#323A3A] text-[0.9rem] font-medium rounded-md grid grid-cols-5 gap-5 px-3 items-center bg-lime-100"
                        >
                          <div className="flex gap-2 items-center">
                            <CalenderIcon size="20" color="#92cc28" />
                            {value.date}
                          </div>
                          <div>{value.specialization}</div>
                          <div className="flex gap-2 items-center">
                            <Profile size="20" color="#92cc28" />
                            {value.coachName}
                          </div>
                          <div className="flex justify-end mr-4">
                            {value["Coach workouts lead"]} people
                          </div>
                          <div className="flex justify-end mr-4">
                            {value["Coach working hours"]} hours
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
