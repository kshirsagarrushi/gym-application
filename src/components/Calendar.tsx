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
const Calendar: React.FC<CalendarProps> = ({ setDate, date }) => {
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
  const shouldDisableDate = (day: Dayjs) => {
    const today = dayjs(); // Get the current date
    const currentMonth = today.month(); // Get the current month
    const currentYear = today.year(); // Get the current year
  
    // Disable dates from previous months and years
    if (day.year() < currentYear) {
      return true;
    } else if (day.year() === currentYear && day.month() < currentMonth) {
      return true;
    }
  
    // Allow selection for the current and next month only
    if (
      day.year() === currentYear &&
      day.month() > currentMonth + 1 // Only allow dates up to the next month
    ) {
      return true;
    }
  
    // Disable dates before today's date
    return day.isBefore(today, "day");
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
          ".MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
          },
          ".MuiDayCalendar-header": {
            justifyContent: "space-between",
          },
          ".MuiPickersDay-root": {
            fontFamily: "'Lexend', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#323A3A",
          },
          ".MuiPickersDay-root.MuiPickersDay-dayOutsideMonth": {
            color: "#B7B6B6",
          },
          ".MuiPickersDay-root:hover": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
          },
          ".MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#F6FFE5",
            color: "#323A3A",
            borderRadius: "50%", // Ensure the border radius is 50% to create a circle
            width: "36px", // Equal width and height
            height: "36px", // Equal height to maintain the circle shape
            border: "1px solid #9EF300", // Light green border
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Ensure the date is centered in the circle
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

export default Calendar;
