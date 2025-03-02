import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clientLogout } from "../store/clientSlice";
import { coachLogin, coachLogout } from "../store/coachSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/SignUpImage.png";
import Star from "../assets/icons/Star";
import Camera from "../assets/icons/Camera";
import CustomTextFeild from "../components/CustomTextFeild";
import Cross from "../assets/icons/Cross";
import Pdf from "../assets/icons/Pdf";
import Download from "../assets/icons/Download";
import Bin from "../assets/icons/Bin";
import validatePassword from "../helpers/validatePassword";
import ChangePassword from "../components/ChangePassword";
import ShowFeedbackList from "../components/ShowFeedbackList";
import { updateCoachDetails } from "../services/updateCoachDetails";
import SuccessFaliureDialog from "../components/SuccessFaliureDialog";
import { CircularProgress } from "@mui/material";
import changeCoachPassword from "../services/changeCoachPassword";
import validateText from "../helpers/validateText";
import getCoachDetails from "../services/getCoachDetails";

type FormDetails = {
  firstName: string;
  lastName: string;
  title: string;
  about: string;
  specialization: string; // Array of strings
  certificates: string[]; // Array of strings
  file: File | null;
};

const CoachDetails = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    firstName: "",
    lastName: "",
    title: "",
    about: "",
    specialization: "",
    certificates: [],
    file: null,
  });
  const [edit, setEdit] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(1);
  const coach = useSelector((state: RootState) => state.coach);
  const [toggle, setToggle] = useState<boolean>(false);
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    oldpassword: "false",
    newpassword: "false",
    confirmPassword: "false",
  });
  const [nameErrors, setNameErrors] = useState({
    first_name: "false",
    last_name: "false",
  });
  const [oldpassword, setOldPassword] = useState<string>("");
  const [newpassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    status: false,
    message: "",
  });
  const [coachDet, setCoachDet] = useState<any>({});

  useEffect(() => {
    const fetch = async () => {
      const coachDeatils = await getCoachDetails(token);
      setPageLoad(false);
      if (!coachDeatils.error) {
        console.log(coachDeatils.data, "hello");
        setCoachDet(coachDeatils.data);
        setFormDetails({
          firstName: coachDeatils.data.firstName,
          lastName: coachDeatils.data.lastName,
          title: coachDeatils.data.title,
          about: coachDeatils.data.about,
          specialization: coachDeatils.data.specialization || "",
          certificates: coachDeatils.data.certificates || [],
          file: null,
        });
      }
    };

    fetch();
  }, [coach, toggle]);

  const dispatch = useDispatch();
  const logout = () => {
    if (coach.firstName) {
      dispatch(coachLogout());
    } else {
      dispatch(clientLogout());
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null); // Creating a ref for the file input

  const fileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };

  // const specializationFilter = (sport: string) => {
  //   setFormDetails((prev) => ({
  //     ...prev,
  //     specialization: prev.specialization.filter((item) => item != sport),
  //   }));
  // };

  const openFile = () => {
    if (formDetails.file) {
      const fileUrl = URL.createObjectURL(formDetails.file);
      window.open(fileUrl, "_blank");
    }
  };

  const deleteCerts = (cert: string) => {
    if (!edit) {
      setFormDetails((prev) => ({
        ...prev,
        certificates: prev.certificates.filter((item) => item !== cert),
      }));
    }
  };

  const addCerts = (cert: string) => {
    setFormDetails((prev) => ({
      ...prev,
      certificates: [...prev.certificates, cert],
      file: null,
    }));
  };

  const token = localStorage.getItem("token");
  const saveChanges = async () => {
    if (activeTab === 1) {
      const { file, ...all } = formDetails;

      if (!formDetails.firstName || !formDetails.lastName) {
        if (!formDetails.firstName) {
          setNameErrors((prev) => ({
            ...prev,
            first_name: "Please Enter First Name",
          }));
        }
        if (!formDetails.lastName) {
          setNameErrors((prev) => ({
            ...prev,
            first_name: "Please Enter Last Name",
          }));
        }
        return;
      } else {
        const firstValid = validateText(formDetails.firstName);
        const lastValid = validateText(formDetails.lastName);
        if (!firstValid) {
          setNameErrors((prev) => ({
            ...prev,
            first_name: "Please Enter Valid First Name",
          }));
          return;
        }
        if (!lastValid) {
          setNameErrors((prev) => ({
            ...prev,
            first_name: "Please Enter Last Name",
          }));
          return;
        }
      }

      setLoading(true);
      const response = await updateCoachDetails(token, all);
      setLoading(false);
      if (response?.error) {
        setDialog({
          status: false,
          message: "Something went wrong, please try again later",
        });
      } else {
        localStorage.setItem("user", JSON.stringify(response?.data));
        dispatch(coachLogin(response?.data));
        setDialog({
          status: true,
          message: "Updated user Successfully",
        });
      }
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
      }, 4000);
    } else {
      const message = validatePassword(newpassword);
      if (!oldpassword || oldpassword.trim() == "") {
        setErrors((prev) => ({
          ...prev,
          oldpassword: "Please Enter Old Password",
        }));
      } else if (!newpassword || newpassword.trim() === "" || message) {
        if (message) {
          setErrors((prev) => ({
            ...prev,
            newpassword: message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            newpassword: "Please Enter Old Password",
          }));
        }
      } else if (
        !confirmPassword ||
        confirmPassword.trim() === "" ||
        confirmPassword !== newpassword
      ) {
        if (confirmPassword !== newpassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword:
              "Confirm New Password does not match New Password.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Please confirm password",
          }));
        }
      } else {
        setLoading(true);
        const response = await changeCoachPassword(
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
        } else {
          setDialog({
            status: true,
            message: "Password Updated Successfully",
          });
        }
      }
    }
  };

  // const [editActivity, setEditActivity] = useState<string[]>([]);
  // useEffect(() => {
  //   const filteredActivities = activityArr.filter(
  //     (activity) => !formDetails.specialization.includes(activity)
  //   );
  //   setEditActivity(filteredActivities); // Set the filtered array to state
  // }, [formDetails]);

  if (pageLoad) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
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
      <SubHeader text="My Account" />
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
            CLIENT FEEDBACK
          </div>
          <div
            className="flex items-center gap-5 my-2 cursor-pointer"
            onClick={() => setActiveTab(3)}
          >
            <div
              className={`h-12 w-[2.5px] bg-[#9EF300] ${
                activeTab === 3 ? "visible" : "invisible"
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
                  src={coach?.profilePicture || avatar}
                  className="w-[4rem] h-[4rem] rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = avatar;
                  }}
                />
                <div className="flex flex-col justify-between ">
                  <div className="font-bold text-[1.3rem]">{`${coach.firstName} ${coach.lastName}(Coach)`}</div>
                  <div className=" font-normal text-[1.2rem]">
                    {coach?.email}
                  </div>
                </div>
                <div className="flex gap-2">
                  Rating <span className="font-bold">{coachDet?.ratings}</span>{" "}
                  <Star />
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
                  <div className="flex items-center gap-5 cursor-pointer max-w-max">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => setEdit(true)}
                    >
                      Cancel
                      <Cross />
                    </div>
                    <div onClick={() => setToggle(!toggle)}>Reset</div>
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
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormDetails((prev) => ({
                      ...prev,
                      firstName: value,
                    }));
                    if (!value) {
                      setNameErrors((prev) => ({
                        ...prev,
                        first_name: "Please Enter First Name",
                      }));
                    } else if (!validateText(value)) {
                      setNameErrors((prev) => ({
                        ...prev,
                        first_name: "Please Enter Valid First Name",
                      }));
                    } else {
                      setNameErrors((prev) => ({
                        ...prev,
                        first_name: "false",
                      }));
                    }
                  }}
                  error={nameErrors.first_name}
                  readonly={edit}
                />
                <CustomTextFeild
                  dataTestId="lastName"
                  label="Last Name"
                  helperText="e.g. Doe"
                  value={formDetails.lastName}
                  placeholder=""
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormDetails((prev) => ({
                      ...prev,
                      lastName: value,
                    }));
                    if (!value) {
                      setNameErrors((prev) => ({
                        ...prev,
                        last_name: "Please Enter Last Name",
                      }));
                    } else if (!validateText(value)) {
                      setNameErrors((prev) => ({
                        ...prev,
                        last_name: "Please Enter Valid Last Name",
                      }));
                    } else {
                      setNameErrors((prev) => ({
                        ...prev,
                        last_name: "false",
                      }));
                    }
                  }}
                  error={nameErrors.last_name}
                  readonly={edit}
                />
              </div>

              <div>
                <CustomTextFeild
                  dataTestId="title"
                  label="Title"
                  value={formDetails.title}
                  placeholder=""
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  error="false"
                  readonly={edit}
                />
              </div>

              <div className="my-[1rem]">
                <CustomTextFeild
                  dataTestId="about"
                  label="About"
                  value={formDetails.about}
                  placeholder=""
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  error="false"
                  readonly={edit}
                  about={true}
                />
              </div>
              {/* <div className="relative my-[1.5rem]">
                <div className=" border-[1.5px] border-[#cbcbcb] rounded-md p-4 min-h-[4rem]">
                  <label className="absolute left-4 -top-2.5 px-2 font-[330] text-[0.8rem] bg-white text-[#4B5563]">
                    Specializations
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {formDetails.specialization.map((item) => (
                      <div className="max-w-max py-1 px-3 bg-[#EEEEEE] rounded-[4px] font-light flex items-center gap-1 text-[0.9rem]">
                        {item}{" "}
                        <div
                          className=" cursor-pointer"
                          onClick={() => {
                            if (!edit) {
                              specializationFilter(item);
                            }
                          }}
                        >
                          <Cross height="14" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {!edit && (
                    <div
                      className="absolute right-4 top-5 cursor-pointer"
                      onClick={() => setOptions(!options)}
                    >
                      <PlusCircle />
                    </div>
                  )}
                  {options && (
                    <div className="absolute z-[1000] right-0 top-16 bg-[#FFF] shadow-2xl p-2 rounded-[8px]">
                      {editActivity.map((item: string) => (
                        <div
                          className="py-2 px-3 hover:bg-[#EEEEEE] cursor-pointer rounded-[4px]"
                          onClick={() => {
                            setOptions(false);
                            setFormDetails((prev) => ({
                              ...prev,
                              specialization: [...prev.specialization, item],
                            }));
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}
              <div>
                <CustomTextFeild
                  dataTestId="Specialization"
                  label="Specialization"
                  value={formDetails.specialization}
                  placeholder=""
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  error="false"
                  readonly={true}
                />
              </div>
              <div className="z-[10]">
                <div className="font-lexend text-[1.2rem] font-semibold">
                  Add your certificates
                </div>
                <div className=" border-dashed border-[2px] border-[#DADADA] py-[1rem] my-[1rem] rounded-[4px] flex flex-col items-center min-h-[130px]">
                  {!formDetails.file ? (
                    <div className="flex flex-col items-center">
                      <div className="font-lexend text-[1rem] font-semibold">
                        Drag & drop file here
                      </div>
                      <div className="font-light">or</div>
                      <div className="w-[100px]">
                        <Button
                          text="Select File"
                          onSubmit={fileSelect}
                          border={true}
                          backroundColor="transparent"
                          padding={true}
                        />
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          ref={fileInputRef}
                          accept="application/pdf"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              setFormDetails((prev) => ({
                                ...prev,
                                file: files[0],
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[100px] gap-3 font-lexend cursor-pointer text-blue-500 underline font-bold flex items-center">
                      <div onClick={() => openFile()}>
                        {formDetails.file.name}
                      </div>
                      <div
                        onClick={() =>
                          setFormDetails((prev) => ({
                            ...prev,
                            file: null,
                          }))
                        }
                      >
                        <Cross />
                      </div>
                      <div className="w-[80px]">
                        <Button
                          text={"Add"}
                          backroundColor="transparent"
                          border={true}
                          padding={true}
                          onSubmit={() => {
                            if (formDetails.file) {
                              addCerts(formDetails.file.name);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {formDetails.certificates?.map((item) => (
                    <div className="flex justify-between my-5 font-[320]">
                      <div className="flex gap-2">
                        <Pdf /> {item}
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <Download />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteCerts(item)}
                        >
                          <Bin />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 &&
            (coachDet.feedbacks.length === 0 ? (
              <div className=" text-center font-bold text-[1.5rem] my-[2rem]">No Feedbacks Yet !!!</div>
            ) : (
              <div>
                <ShowFeedbackList currentFeedbacks={coachDet.feedbacks} />
              </div>
            ))}
          {activeTab === 3 && (
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
          )}
          {activeTab !== 2 && (
            <div className="flex justify-end 2xl:max-w-[75%]">
              <div className="w-[130px]">
                <Button
                  text={
                    loading ? (
                      <CircularProgress size={"20px"} />
                    ) : (
                      "Save Changes"
                    )
                  }
                  onSubmit={() => saveChanges()}
                  padding={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachDetails;
