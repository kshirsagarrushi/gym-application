import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";

interface CustomSelectProps {
  label: string;
  menuItems: string[];
  setOuterTarget: (value: string) => void;
  disabled?: boolean;
  defaultTarget?: string;
}

const CustomDropdown: FC<CustomSelectProps> = ({
  label,
  menuItems,
  setOuterTarget,
  disabled,
  defaultTarget,
}) => {
  const [target, setTarget] = useState<string>(defaultTarget || menuItems[0]);

  return (
    <div className="w-full">
      <FormControl
        className="w-full"
        disabled={disabled}
        sx={{
          mt: 2,
          mb: 2,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
              "& fieldset": {
                borderColor: "#DADADA",
                borderWidth: "1px",
              },
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#4B5563",
            },
            fontFamily: "Lexend",
            color: "#4B5563",
            fontWeight: 300,
            borderColor: "#DADADA",
            backgroundColor: "white",
            paddingRight: "6px",
          },
          "& .MuiFormHelperText-root": {
            fontFamily: "Lexend",
            color: "#909090",
            fontWeight: 300,
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "14px",
            fontWeight: 300,
          },
        }}
      >
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={target || menuItems[0]}
          label="Age"
          onChange={(e) => {
            setTarget(e.target.value);
            setOuterTarget(e.target.value);
          }}
          disabled={disabled}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "12rem",
                overflowY: "auto",
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "1px solid #DADADA",
              },
              "&:hover fieldset": {
                borderColor: "none",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#DADADA",
                borderWidth: "2px",
              },
            },
            "& .MuiInputBase-input": {
              fontFamily: "Lexend",
              fontSize: "14px",
              fontWeight: 300,
              "&:hover": {
                border: "none",
              },
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item}
              value={item}
              sx={{
                backgroundColor: target === item ? "#F6FFE5" : "transparent",
                "&:hover": {
                  backgroundColor: "#F6FFE5",
                },
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomDropdown;