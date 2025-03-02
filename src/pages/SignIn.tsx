import img from "../assets/SignUpImage.png";
import CustomTextField from "../components/CustomTextFeild";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../services/authentication";
import validateEmail from "../helpers/validateEmail";
import { useDispatch } from "react-redux";
import { clientLogin } from "../store/clientSlice";
import { CircularProgress } from "@mui/material";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import { coachLogin } from "../store/coachSlice";
import { adminLogin } from "../store/adminSlice";
const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState({
    email: "false",
    password: "false",
  });

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!email || !validateEmail(email)) {
      if (!email) {
        setErrors((prev) => ({
          ...prev,
          email: "Please Enter Email",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid Email Format",
        }));
      }
    } else if (!password || password.trim() == "") {
      setErrors(() => ({
        email: "false",
        password: "Please Enter Password",
      }));
    } else {
      setLoading(true);
      const result: any = await signIn(email, password);
      setLoading(false);
      if (result.error) {
        setDialogOpen(true);
        setTimeout(() => {
          setDialogOpen(false);
        }, 4000);
        if (result.message.includes("internet connection")) {
          setDialog({ status: false, message: result.message });
        } else {
          setDialog({
            message: result.message,
            status: false,
          });
        }
      } else {
        console.log("result", result);
        if (result.data.role == "client") {
          dispatch(clientLogin(result.data.userDetails));
          navigate("/");
        } else {
          console.log(result.data.userDetails);
          if (result.data.role == "admin") {
            const object = { ...result.data.userDetails, role: "admin" };
            dispatch(coachLogin(object));
            navigate("/admindashboard");
          } else {
            dispatch(coachLogin(result.data.userDetails));
            navigate("/coachworkouts");
          }
        }
      }
    }
  };
  return (
    <div className="bg-[#FFFFFF] flex p-2 sm:p-5 min-h-[100vh]">
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
      />
      <div className="sm:w-1/2 mx-16 flex items-center justify-center">
        <div className="w-full lg:w-[90%] xl:w-[80%] 2xl:w-[60%]">
          <div className="mb-12">
            <div className="font-lexend text-[#323A3A] font-light text-[0.9rem]">
              WELCOME BACK
            </div>
            <div className="font-lexend text-[#323A3A] font-medium text-[1.5rem]">
              Log In to Your Account
            </div>
          </div>
          <CustomTextField
            dataTestId="email"
            value={email}
            label="Email"
            placeholder="Enter your email"
            helperText="e.g. username@domain.com"
            onChange={(e) => {
              if (email && !validateEmail(email)) {
                setErrors(() => ({
                  email: "Invalid Email Format",
                  password: "false",
                }));
              }
              if (validateEmail(email)) {
                setErrors(() => ({
                  email: "false",
                  password: "false",
                }));
              }
              setEmail(e.target.value);
            }}
            error={errors.email}
          />
          <CustomTextField
            dataTestId="password"
            value={password}
            label="Password"
            placeholder="Enter your password"
            helperText="At least one capital letter required"
            onChange={(e) => {
              if (password && password.trim() != "") {
                setErrors(() => ({
                  email: "false",
                  password: "false",
                }));
              }
              setPassword(e.target.value);
            }}
            type="password"
            error={errors.password}
          />

          <Button
            text={loading ? <CircularProgress size={"20px"} /> : "Log In"}
            onSubmit={() => onSubmit()}
          />
          <div className="text-[#212121] font-lexend font-normal sm:flex gap-1 justify-center text-[0.8rem] mt-3">
            Dont't have an account?{" "}
            <Link to={"/signup"} className="font-bold underline">
              CREATE NEW ACCOUNT
            </Link>
          </div>
        </div>
      </div>
      <div
        className="hidden sm:w-1/2 p-10 rounded-[24px] min-h-full bg-cover bg-no-repeat bg-center sm:flex items-end"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="text-white text-[1.95rem] mb-[3rem] font-medium font-lexend">
          “The path to triumph is paved with the{" "}
          <span className="text-[#9EF300]">strength to train hard</span> and the
          perseverance to rise{" "}
          <span className="text-[#9EF300]">each time you fall</span>.”
        </div>
      </div>
    </div>
  );
};

export default SignIn;
