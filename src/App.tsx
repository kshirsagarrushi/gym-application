import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import CoachProfile from "./pages/CoachProfile";
import SignIn from "./pages/SignIn";
import ClientWorkouts from "./pages/ClientWorkouts";
import Home from "./pages/Home";
import AllCoaches from "./pages/AllCoaches";
import CoachWorkouts from "./pages/CoachWorkouts";
import CoachPrivateRoute from "./components/coachPrivateRoute";
import ClientPrivateRoute from "./components/ClientPrivateRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clientLogin, clientLogout } from "./store/clientSlice";
import { coachLogin, coachLogout } from "./store/coachSlice";
import CoachDetails from "./pages/CoachDetails";
import ClientDetails from "./pages/ClientDetails";
import checkTokenExpiry from "./helpers/checkTokenExpiry";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const funct = async () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (user) {
        const userParsed = JSON.parse(user);
        if (userParsed.role == "client") {
          dispatch(clientLogin(userParsed));
          // const check = await checkTokenExpiry(token || "", "client");
          // if (check) {
          // } else {
          //   dispatch(clientLogout());
          //   localStorage.removeItem("token");
          //   localStorage.removeItem("user");
          // }
        } else {
          dispatch(coachLogin(userParsed));
          // const check = await checkTokenExpiry(token || "", "coach");
          // if (check) {
          // } else {
          //   dispatch(coachLogout());
          //   localStorage.removeItem("token");
          //   localStorage.removeItem("user");
          // }
        }
      }
    };
    funct();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/coach/profile/:coachId" element={<CoachProfile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/clientworkouts"
          element={
            <ClientPrivateRoute>
              <ClientWorkouts />
            </ClientPrivateRoute>
          }
        />
        <Route path="/coaches" element={<AllCoaches />} />
        <Route path="/coachdetails" element={<CoachDetails />} />
        <Route path="/clientdetails" element={<ClientDetails />} />
        <Route
          path="/coachworkouts"
          element={
            <CoachPrivateRoute>
              <CoachWorkouts />
            </CoachPrivateRoute>
          }
        />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
