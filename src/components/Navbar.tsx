import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { clientLogout } from "../store/clientSlice";
import { coachLogout } from "../store/coachSlice";
import { adminLogout } from "../store/adminSlice";
import HomeIcon from "../assets/icons/HomeIcon";
import Notification from "../assets/icons/Notification";
import Profile from "../assets/icons/Profile";
import Control from "../assets/icons/Control";
import Button from "./Button";

const Navbar = () => {
  const client = useSelector((state: RootState) => state.client);
  const coach = useSelector((state: RootState) => state.coach);
  const admin = useSelector((state: RootState) => state.admin);
  const [modelOpen, setModalOpen] = useState<boolean>(false);

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    if (client.firstName) {
      dispatch(clientLogout());
    } else if (coach.firstName) {
      dispatch(coachLogout());
    } else {
      dispatch(adminLogout());
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setModalOpen(false);
    navigate("/");
  };
  useEffect(() => {
    if (
      !client.firstName &&
      !admin.firstName &&
      coach.firstName &&
      location.pathname === "/"
    ) {
      navigate("/coachworkouts");
    }
  }, [client.firstName, coach.firstName, location.pathname, navigate]);

  return (
    <div className="w-full flex justify-between items-center py-4 px-2 sm:py-5 sm:px-8">
      <div className="flex items-center gap-3 sm:gap-6 text-[#323A3A] font-lexend font-normal text-[1.1rem]">
        <Link
          className="hidden sm:block"
          to={
            client?.firstName
              ? "/"
              : admin?.firstName
              ? "/admindashboard"
              : "/coachworkouts"
          }
        >
          <HomeIcon />
        </Link>
        {coach.firstName && coach.role == "admin" ? (
          <div className="flex items-center gap-3">
            <Link
              className="flex flex-col gap-1 justify-center mt-1"
              to={"/admindashboard"}
            >
              Reports
              <span
                className={`min-w-full min-h-[2px] ${
                  path == "/admindashboard" ? "bg-[#9EF300]" : "bg-transparent"
                } `}
              ></span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {!coach.firstName && (
              <Link
                className="flex flex-col gap-1 justify-center mt-1"
                to={"/"}
              >
                Home
                <span
                  className={`min-w-full min-h-[2px] ${
                    path == "/" ? "bg-[#9EF300]" : "bg-transparent"
                  } `}
                ></span>
              </Link>
            )}
            {(client.firstName || coach.firstName) && coach.role != "admin" && (
              <Link
                className="flex flex-col gap-1 justify-center mt-1"
                to={client.firstName ? "/clientworkouts" : "/coachworkouts"}
              >
                Workouts
                <span
                  className={`min-w-full min-h-[2px] ${
                    path.includes("workouts")
                      ? "bg-[#9EF300]"
                      : "bg-transparent"
                  } `}
                ></span>
              </Link>
            )}
            {((!admin.firstName && !client.firstName && !coach.firstName)|| client.firstName) && (
              <Link
                className="flex flex-col gap-1 justify-center mt-1"
                to={"/coaches"}
              >
                Coaches
                <span
                  className={`min-w-full min-h-[2px] ${
                    path == "/coaches" ? "bg-[#9EF300]" : "bg-transparent"
                  } `}
                ></span>
              </Link>
            )}
          </div>
        )}
        {admin.firstName && (
          <Link to={"/admindashboard"}>
            Reports
            <span
              className={`min-w-full min-h-[2px] ${
                path == "/admindashboard" ? "bg-[#9EF300]" : "bg-transparent"
              } `}
            ></span>
          </Link>
        )}
      </div>
      {client.firstName || coach.firstName ? (
        <div className="flex gap-3 sm:gap-5">
          <Notification />
          <div className="relative" onClick={() => console.log("working")}>
            <div
              className="cursor-pointer"
              onClick={() => setModalOpen(!modelOpen)}
            >
              <Profile />
            </div>
            {modelOpen && (
              <div className="absolute top-7 -right-3 rounded-[8px] min-w-max px-6 py-3 shadow-xl bg-white z-[10]">
                <div className="space-y-0 pt-2 pb-5 border-b-[1px] px-4">
                  <div className="font-lexend font-semibold text-[#323A3A] text-[1rem]">
                    {coach.firstName
                      ? coach.role == "admin"
                        ? `${coach.firstName} ${coach.lastName}  (Admin)`
                        : `${coach.firstName} ${coach.lastName}  (Coach)`
                      : `${client.firstName} ${client.lastName}  (Client)`}
                  </div>
                  <div className="font-lexend font-light text-[#323A3A] text-[0.9rem] text-center">
                    {coach.firstName ? coach.email : client.email}
                  </div>
                </div>

                <div className="">
                  {(!coach.firstName || coach.role != "admin") && (
                    <Link
                      to={coach?.firstName ? "/coachdetails" : "/clientdetails"}
                      className="flex items-center gap-3 py-4"
                    >
                      <Control />
                      <div>
                        <div className="font-lexend font-semibold text-[#323A3A] text-[1rem]">
                          My Account
                        </div>
                        <div className="font-lexend font-light text-[#323A3A] text-[1rem]">
                          Edit account profile
                        </div>
                      </div>
                    </Link>
                  )}

                  <Button
                    text="Log Out"
                    onSubmit={() => logout()}
                    backroundColor="transparent"
                    border={true}
                    padding={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-[18%] sm:w-[8%]">
          <Button
            text="Log In"
            backroundColor="transparent"
            onSubmit={() => navigate("/signin")}
            border={true}
            padding={true}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
