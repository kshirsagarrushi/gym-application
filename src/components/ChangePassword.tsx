import { FC } from "react";
import validatePassword from "../helpers/validatePassword";
import CustomTextFeild from "./CustomTextFeild";

export interface FormErrors {
  oldpassword: string;
  newpassword: string;
  confirmPassword: string;
}

interface ChangePasswordProps {
  oldpassword: string;
  newpassword: string;
  confirmPassword: string;
  setOldPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

const ChangePassword: FC<ChangePasswordProps> = ({
  oldpassword,
  newpassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  errors,
  setErrors,
}) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    if (newPassword.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        password: "false",
      }));
      return;
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setErrors((prev) => ({
        ...prev,
        newpassword: passwordError,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        newpassword: "false",
      }));
    }
  };
  return (
    <div className="2xl:max-w-[75%]">
      <CustomTextFeild
        dataTestId="oldPassword"
        value={oldpassword}
        label="Old Password"
        placeholder="Enter Old password"
        helperText="At least one capital letter required"
        onChange={(e) => {
          const value = e.target.value;
          setOldPassword(value);

          if (value.trim() !== "") {
            setErrors((prev) => ({
              ...prev,
              oldpassword: "false",
            }));
          }
        }}
        type="password"
        error={errors.oldpassword}
      />
      <CustomTextFeild
        dataTestId="newPassword"
        value={newpassword}
        label="New Password"
        placeholder="Enter New password"
        helperText="At least one capital letter required"
        onChange={handlePasswordChange}
        type="password"
        error={errors.newpassword}
      />
      <CustomTextFeild
        dataTestId="confirmPassword"
        value={confirmPassword}
        label="Confirm New Password"
        placeholder="Enter Confirm New password"
        helperText="At least one capital letter required"
        onChange={(e) => {
          if (confirmPassword && confirmPassword.trim() != "") {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "false",
            }));
          }
          setConfirmPassword(e.target.value);
        }}
        type="password"
        error={errors.confirmPassword}
      />
    </div>
  );
};

export default ChangePassword;
