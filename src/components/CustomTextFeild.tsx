import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import { FC, useState } from "react";

interface CustomTextFieldProps {
  label: string;
  placeholder: string;
  helperText?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e?: React.FormEvent) => void;
  error?: string;
  value: string;
  readonly?: boolean;
  about?: boolean;
  dataTestId: string;
}

const CustomTextFeild: FC<CustomTextFieldProps> = ({
  label,
  placeholder,
  helperText,
  type,
  onChange,
  onSubmit,
  error,
  value,
  readonly,
  about,
  dataTestId,
}) => {
  const submitting = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Determine the input type, default to "password" or use provided type.
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full relative">
      {about ? (
        <>
          <TextField
            data-testid={dataTestId}
            // Removed 'multiline' for password fields, it's not needed here
            slotProps={{
              input: {
                readOnly: readonly ? true : false,
              },
            }}
            value={value}
            focused
            error={error === "false" ? false : true}
            className="font-lexend w-full"
            id="outlined-helperText"
            label={label}
            placeholder={placeholder}
            helperText={
              helperText ? (error === "false" ? helperText : error) : ""
            }
            sx={{
              mt: 1,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& fieldset": {
                    borderColor: error !== "false" ? "#FF4242" : "#DADADA", // Set border color on focus
                    borderWidth: "1px", // Set border width on focus
                  },
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#4B5563", // Prevent the label from turning blue on focus
                },
              },
              "& .MuiFormHelperText-root": {
                fontFamily: "Lexend",
                color: error === "false" ? "#909090" : "#FF4242",
                fontWeight: 300,
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "14px",
                fontWeight: 300,
              },
            }}
            type={inputType} // Correctly set the type to password or text
            onChange={onChange}
            onClick={submitting}
            multiline
          />
          {type === "password" && (
            <div
              className="absolute right-3 top-6 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlined />
              ) : (
                <RemoveRedEyeOutlined />
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <TextField
            data-testid={dataTestId}
            // Removed 'multiline' for password fields, it's not needed here
            slotProps={{
              input: {
                readOnly: readonly ? true : false,
              },
            }}
            value={value}
            focused
            error={error === "false" ? false : true}
            className="font-lexend w-full"
            id="outlined-helperText"
            label={label}
            placeholder={placeholder}
            helperText={
              helperText ? (error === "false" ? helperText : error) : ""
            }
            sx={{
              mt: 1,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& fieldset": {
                    borderColor: error !== "false" ? "#FF4242" : "#DADADA", // Set border color on focus
                    borderWidth: "1px", // Set border width on focus
                  },
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#4B5563", // Prevent the label from turning blue on focus
                },
              },
              "& .MuiFormHelperText-root": {
                fontFamily: "Lexend",
                color: error === "false" ? "#909090" : "#FF4242",
                fontWeight: 300,
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "14px",
                fontWeight: 300,
              },
            }}
            type={inputType} // Correctly set the type to password or text
            onChange={onChange}
            onClick={submitting}
          />
          {type === "password" && (
            <div
              data-testid="eye"
              className="absolute right-3 top-6 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlined />
              ) : (
                <RemoveRedEyeOutlined />
              )}
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default CustomTextFeild;
