import { useEffect, useState } from "react";
import { getAllCoaches } from "../services/coachService";
import CoachInfoCard from "../components/CoachInfoCard";
import Navbar from "../components/Navbar";
import { CircularProgress } from "@mui/material";
import NotAvailableCoaches from "../assets/NotAvailableCoachest.tsx"
export interface CoachInfo {
  profilePicture: string;
  firstName: string;
  lastName: string;
  ratings: number;
  title: string;
  summary: string;
  coachId: number;
}

const AllCoaches: React.FC = () => {
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [coaches, setCoaches] = useState<CoachInfo[]>();

  useEffect(() => {
    const fetchCoaches = async () => {
      const data = await getAllCoaches();
      setPageLoad(false);
      if (data.error) {
        setCoaches([]);
      } else {
        setCoaches(data.data);
      }
    };
    fetchCoaches();
  }, []);

  return (
    <div>
      <Navbar />
      {pageLoad ? (
        <div className="min-h-[70vh] w-full flex justify-center items-center">
          <CircularProgress size={"30px"} />
        </div>
      ) : (
        <div className="top-[8rem] left-[2.5rem] flex justify-center">
          {coaches && coaches.length > 0 ? (
            <div className="flex flex-wrap gap-[2rem] px-[2.5rem] py-[2.5rem] justify-center">
              {coaches?.map((coach) => {
                return (
                  <CoachInfoCard
                    key={coach.coachId}
                    image={coach.profilePicture}
                    name={`${coach.firstName} ${coach.lastName}`}
                    rating={coach.ratings}
                    title={coach.title}
                    summary={coach.summary}
                    coachId={coach.coachId}
                  />
                );
              })}
            </div>
          ) : (
            <NotAvailableCoaches/>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCoaches;
