import React, { useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs, { Dayjs } from "dayjs";

// Define the props for the custom header
interface CustomCalendarHeaderProps {
  currentMonth: Dayjs;
  onMonthChange: Function;
}

// Custom header component
const CustomCalendarHeader: React.FC<CustomCalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
}) => {
  const handlePrevious = () => {
    onMonthChange(currentMonth.subtract(1, "month"));
  };

  const handleNext = () => {
    onMonthChange(currentMonth.add(1, "month"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
        padding: "10px",
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        aria-label="Previous Month"
      >
        <ArrowBackIosIcon sx={{ color: "#323A3A", fontSize: "medium" }} />
      </IconButton>
      <Typography
        sx={{ fontWeight: "medium", color: "#323A3A", fontSize: "1rem" }}
      >
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next Month"
      >
        <ArrowForwardIosIcon sx={{ color: "#323A3A", fontSize: "medium" }} />
      </IconButton>
    </Box>
  );
};

interface CalendarProps {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
}

// Calendar component
const ReportCalendar: React.FC<CalendarProps> = ({ setDate, date }) => {
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const date = newDate.date();
      const month = newDate.format("MMMM");
      const year = newDate.year();

      setDate(`${month} ${date} ${year}`);
    }
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    // Convert the provided date prop to a Dayjs object
    if (date) {
      const parsedDate = dayjs(date, "MMMM D YYYY"); // Using the format "Month Day Year"
      setSelectedDate(parsedDate.isValid() ? parsedDate : null);
    }
  }, [date]);

  // Function to check if a date should be disabled
  // Function to check if a date should be disabled
  const shouldDisableDate = (day: Dayjs) => {
    const today = dayjs(); // Get the current date
    const cutoffDate = dayjs("2024-10-25"); // October 25, 2024

    // Disable future dates (next day onwards)
    if (day.isAfter(today, "day")) {
      return true;
    }

    // Disable dates before October 25, 2024
    if (day.isBefore(cutoffDate, "day")) {
      return true;
    }

    return false; // Enable dates from October 25, 2024, till today
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        showDaysOutsideCurrentMonth={false} // Hide dates from other months
        shouldDisableDate={shouldDisableDate}
        sx={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "0px 20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "370px",
          height: "295px",
          ".MuiPickersDay-root": {
            fontFamily: "'Lexend', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#323A3A",
          },
          ".MuiPickersDay-root.Mui-disabled": {
            pointerEvents: "none", // Disable interaction
            color: "#B7B6B6", // Grey out disabled dates
            cursor: "default", // Change cursor to default (no pointer)
          },
          ".MuiPickersDay-root:hover": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
          },
          ".MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            border: "1px solid #9EF300",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#F6FFE5",
              color: "#323A3A",
            },
          },
          "& .MuiPickersDay-root.Mui-selected.Mui-focusVisible": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
          },
        }}
        dayOfWeekFormatter={(day) =>
          day.format("dddd").substring(0, 3).toUpperCase()
        }
        slots={{
          calendarHeader: (props) => (
            <CustomCalendarHeader
              currentMonth={props.currentMonth!}
              onMonthChange={props.onMonthChange!}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default ReportCalendar;
