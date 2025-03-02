import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { clientLogin, clientLogout } from "../store/clientSlice";
import { coachLogout } from "../store/coachSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/SignUpImage.png";
import Camera from "../assets/icons/Camera";
import CustomTextFeild from "../components/CustomTextFeild";
import Cross from "../assets/icons/Cross";
import CustomDropdown from "../components/CustomDropdown";
import { activityArr, targetArr } from "../helpers/Data";
import { updateClientDetails } from "../services/updateClientDetails";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import { CircularProgress } from "@mui/material";
import ChangePassword from "../components/ChangePassword";
import { RootState } from "../store/store";
import validatePassword from "../helpers/validatePassword";
import changeClientPassword from "../services/changeClientPassword";

type FormDetails = {
  firstName: string;
  lastName: string;
  target: string;
  preferableActivity: string;
};

const ClientDetails = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    firstName: "",
    lastName: "",
    target: "",
    preferableActivity: "",
  });
  const [edit, setEdit] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading
  const [oldpassword, setOldPassword] = useState<string>("");
  const [newpassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    oldpassword: "false",
    newpassword: "false",
    confirmPassword: "false",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const client = useSelector((state: RootState) => state.client);

  useEffect(() => {
    const client = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

    if (client?.firstName) {
      setFormDetails({
        firstName: client.firstName,
        lastName: client.lastName,
        target: client.target,
        preferableActivity: client.preferableActivity,
      });
    }

    setIsLoading(false); // Set isLoading to false after formDetails is set
  }, []);

  const logout = () => {
    const client = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

    if (client?.firstName) {
      dispatch(clientLogout());
    } else {
      dispatch(coachLogout());
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleTargetChange = (value: string) => {
    setFormDetails((prev) => ({ ...prev, target: value }));
  };

  const handleActivityChange = (value: string) => {
    setFormDetails((prev) => ({ ...prev, preferableActivity: value }));
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    const response = await updateClientDetails(token, formDetails);
    setLoading(false);
    if (response?.error) {
      setDialogOpen(true);
      setDialog({ status: false, message: response.data });
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
    } else {
      setDialogOpen(true);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...client,
          firstName: formDetails.firstName,
          lastName: formDetails.lastName,
          target: formDetails.target,
          preferableActivity: formDetails.preferableActivity,
        })
      );
      dispatch(
        clientLogin({
          ...client,
          firstName: formDetails.firstName,
          lastName: formDetails.lastName,
          target: formDetails.target,
          preferableActivity: formDetails.preferableActivity,
        })
      );
      setDialog({ status: true, message: "Details updated successfully" });
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
    }
  };

  const ChangePass = async () => {
    const message = validatePassword(newpassword);
    if (!oldpassword || oldpassword.trim() == "") {
      setErrors((prev) => ({
        ...prev,
        oldpassword: "Please Enter Old Password",
      }));
      return;
    } else if (!newpassword || newpassword.trim() === "" || message) {
      if (message) {
        setErrors((prev) => ({
          ...prev,
          newpassword: message,
        }));
        return;
      } else {
        setErrors((prev) => ({
          ...prev,
          newpassword: "Please Enter Old Password",
        }));
        return;
      }
    } else if (
      !confirmPassword ||
      confirmPassword.trim() === "" ||
      confirmPassword !== newpassword
    ) {
      if (confirmPassword !== newpassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Confirm New Password does not match New Password.",
        }));
        return;
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Please confirm password",
        }));
        return;
      }
    }
    setLoading(true);
    const response = await changeClientPassword(
      oldpassword,
      newpassword,
      token
    );
    
    setLoading(false);
    setDialogOpen(true);
    if (response.error) {
      setDialog({
        status: false,
        message: response.message,
      });
      setTimeout(()=>{
        setDialogOpen(false);
      },4000)
    } else {
        setDialog({
          status: true,
          message: "Password Updated Successfully",
      });
      setTimeout(()=>{
        setDialogOpen(false);
      },4000)
    }
  };

  return (
    <div>
      <SuccessFaliureDialog
        success={dialog.status}
        message={dialog.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
      />
      <Navbar />
      <SubHeader text="My Account" />
      {isLoading ? (
        <div className="min-h-[70vh] w-full flex justify-center items-center">
          <CircularProgress size={"30px"} />
        </div>
      ) : (
        <div className="sm:flex py-12">
          <div className=" sm:w-4/12 xl:w-3/12 px-2 sm:px-8 font-lexend font-medium text-[#323A3A]">
            <div
              className="flex items-center gap-5 my-2 cursor-pointer"
              onClick={() => setActiveTab(1)}
            >
              <div
                className={`h-12 w-[2.5px] bg-[#9EF300] ${
                  activeTab === 1 ? "visible" : "invisible"
                }`}
              />
              GENERAL INFORMATION
            </div>
            <div
              className="flex items-center gap-5 my-2 cursor-pointer"
              onClick={() => setActiveTab(2)}
            >
              <div
                className={`h-12 w-[2.5px] bg-[#9EF300] ${
                  activeTab === 2 ? "visible" : "invisible"
                }`}
              />
              CHANGE PASSWORD
            </div>

            <div className=" sm:w-[40%] 2xl:w-[25%] my-[2.5rem]">
              <Button
                text="Log Out"
                onSubmit={() => logout()}
                backroundColor="transparent"
                border={true}
                padding={true}
              />
            </div>
          </div>
          <div className=" sm:w-8/12 xl:w-9/12 px-[2rem] font-lexend text-[#323A3A]">
            {activeTab === 1 && (
              <div className="2xl:max-w-[75%]">
                <div className="flex gap-5">
                  <img
                    src={avatar}
                    className="w-[4rem] h-[4rem] rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = avatar;
                    }}
                  />
                  <div className="flex flex-col justify-between ">
                    <div className="font-bold text-[1.3rem]">
                      {`${client.firstName} ${client.lastName} (Client)`}
                    </div>
                    <div className=" font-normal text-[1.2rem]">
                      {client.email}
                    </div>
                  </div>
                </div>
                <div className="font-semibold py-2 ">
                  {edit ? (
                    <div
                      className="flex items-center gap-2 cursor-pointer max-w-max"
                      onClick={() => setEdit(false)}
                    >
                      Edit
                      <Camera />
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-2 cursor-pointer max-w-max"
                      onClick={() => setEdit(true)}
                    >
                      Cancel
                      <Cross />
                    </div>
                  )}
                </div>

                <div className="flex gap-5">
                  <CustomTextFeild
                    dataTestId="firstName"
                    label="First Name"
                    helperText="e.g. Johnson"
                    value={formDetails.firstName}
                    placeholder=""
                    onChange={(e) =>
                      setFormDetails((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    error="false"
                    readonly={edit}
                  />
                  <CustomTextFeild
                    dataTestId="lastName"
                    label="Last Name"
                    helperText="e.g. Doe"
                    value={formDetails.lastName}
                    placeholder=""
                    onChange={(e) =>
                      setFormDetails((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    error="false"
                    readonly={edit}
                  />
                </div>

                <div>
                  <CustomDropdown
                    label="Your target"
                    defaultTarget={formDetails.target}
                    menuItems={targetArr}
                    setOuterTarget={handleTargetChange}
                    disabled={edit}
                  />
                  <CustomDropdown
                    label="Preferable Activity "
                    defaultTarget={formDetails.preferableActivity}
                    menuItems={activityArr}
                    setOuterTarget={handleActivityChange}
                    disabled={edit}
                  />
                </div>

                <div className="flex justify-end">
                  <div className="w-[130px]">
                    <Button
                      text={
                        loading ? (
                          <CircularProgress size={"20px"} />
                        ) : (
                          "Save Changes"
                        )
                      }
                      onSubmit={handleUpdateDetails}
                      padding={true}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <ChangePassword
                  oldpassword={oldpassword}
                  newpassword={newpassword}
                  confirmPassword={confirmPassword}
                  setOldPassword={setOldPassword}
                  setNewPassword={setNewPassword}
                  setConfirmPassword={setConfirmPassword}
                  errors={errors}
                  setErrors={setErrors}
                />
                <div className="flex justify-end">
                  <div className="w-[130px]">
                    <Button
                      text={
                        loading ? (
                          <CircularProgress size={"20px"} />
                        ) : (
                          "Save Changes"
                        )
                      }
                      onSubmit={() => ChangePass()}
                      padding={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
