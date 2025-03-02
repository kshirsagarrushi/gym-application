import img from "../assets/SignUpImage.png";
import CustomTextFeild from "../components/CustomTextFeild";
import { useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import validateEmail from "../helpers/validateEmail";
import { signUp } from "../services/authentication";
import validatePassword from "../helpers/validatePassword";
import { activityArr, targetArr } from "../helpers/Data";
import validateText from "../helpers/validateText";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import { CircularProgress } from "@mui/material";

const SignUp = () => {
  const [errors, setErrors] = useState({
    firstName: "false",
    lastName: "false",
    email: "false",
    password: "false",
  });
  const [target, setTarget] = useState<string>(targetArr[0]);
  const [activity, setActivity] = useState<string>(activityArr[0]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!firstName || firstName.trim() == "" || !validateText(firstName)) {
      if (!validateText(firstName)) {
        setErrors((prev) => ({
          ...prev,
          firstName: "Please enter valid first name",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          firstName: "Please enter first name",
        }));
      }
    } else if (!lastName || lastName.trim() == "" || !validateText(lastName)) {
      if (!validateText(lastName)) {
        setErrors((prev) => ({
          ...prev,
          firstName: "false",
          lastName: "Please enter valid last name",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          firstName: "false",
          lastName: "Please enter last name",
        }));
      }
    } else if (!email || !validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        firstName: "false",
        lastName: "false",
        email: "Invalid Email Format",
      }));
    } else if (
      !password ||
      password.trim() == "" ||
      validatePassword(password)
    ) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setErrors(() => ({
          firstName: "false",
          lastName: "false",
          email: "false",
          password: passwordError,
        }));
      } else {
        setErrors(() => ({
          firstName: "false",
          lastName: "false",
          email: "false",
          password: "false",
        }));
      }
    } else {
      setLoading(true);
      const result: any = await signUp(
        firstName,
        lastName,
        email,
        password,
        activity,
        target
      );
      setLoading(false);
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
      if (result.error) {
        setDialog({
          message: result.message,
          status: false,
        });
      } else {
        setDialog({
          message: result.message,
          status: true,
        });
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    // Update the password state first
    setPassword(newPassword);

    // Only validate if password is not empty
    if (newPassword.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        password: "false", // Clear error if password is empty
      }));
      return;
    }

    // Validate password
    const passwordError = validatePassword(newPassword);

    // Update errors based on validation result
    if (passwordError) {
      setErrors((prev) => ({
        ...prev,
        password: passwordError, // Set the specific error message
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "false", // Clear password error if valid
      }));
    }
  };

  return (
    <div className="bg-[#FFFFFF] sm:flex p-2 sm:p-5 min-h-[100vh]">
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
              LET'S GET YOU STARTED
            </div>
            <div className="font-lexend text-[#323A3A] font-medium text-[1.5rem]">
              Create An Account
            </div>
          </div>
          <div className="w-full sm:flex gap-3">
            <CustomTextFeild
              dataTestId="firstName"
              value={firstName}
              label="First Name"
              placeholder="Enter your First Name"
              helperText="e.g. Johnson"
              onChange={(e) => {
                if (firstName && firstName.trim() != "") {
                  setErrors((prev) => ({
                    ...prev,
                    firstName: "false",
                  }));
                }
                setFirstName(e.target.value);
              }}
              error={errors.firstName}
            />
            <CustomTextFeild
              dataTestId="lastName"
              value={lastName}
              label="Last Name"
              placeholder="Enter your Last Name"
              helperText="e.g. Doe"
              onChange={(e) => {
                if (lastName && lastName.trim() != "") {
                  setErrors((prev) => ({
                    ...prev,
                    lastName: "false",
                  }));
                }
                setLastName(e.target.value);
              }}
              error={errors.lastName}
            />
          </div>
          <CustomTextFeild
            dataTestId="email"
            value={email}
            label="Email"
            placeholder="Enter your email"
            helperText="e.g. username@domain.com"
            onChange={(e) => {
              if (email && validateEmail(email)) {
                setErrors((prev) => ({
                  ...prev,
                  email: "false",
                }));
              }
              setEmail(e.target.value);
            }}
            error={errors.email}
          />
          <CustomTextFeild
            dataTestId="password"
            value={password}
            label="Password"
            placeholder="Enter your password"
            helperText="At least one capital letter required"
            onChange={handlePasswordChange}
            type="password"
            error={errors.password}
          />
          <CustomDropdown
            label="Your target"
            menuItems={targetArr}
            setOuterTarget={setTarget}
          />
          <CustomDropdown
            label="Preferable Activity "
            menuItems={activityArr}
            setOuterTarget={setActivity}
          />
          <Button
            text={
              loading ? (
                <CircularProgress
                  data-testid="circular-progress"
                  size={"20px"}
                />
              ) : (
                "Create An Account"
              )
            }
            onSubmit={() => onSubmit()}
          />
          <div className="text-[#212121] font-lexend font-normal sm:flex gap-1 justify-center text-[0.8rem] mt-3">
            Already have an account?{" "}
            <Link to={"/signin"} className="font-bold underline">
              LOGIN HERE
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

export default SignUp;
