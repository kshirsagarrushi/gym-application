import React, { useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs, { Dayjs } from "dayjs";
import { Booking, Slots } from "../pages/CoachProfile";

interface CustomCalendarHeaderProps {
  currentMonth: Dayjs;
  onMonthChange: Function;
}

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
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        aria-label="Previous Month"
        sx={{ color: "#323A3A" }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "medium" }} />
      </IconButton>
      <Typography
        sx={{ fontWeight: "medium", color: "#323A3A", fontSize: "1rem" }}
      >
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next Month"
          sx={{ color: "#323A3A", marginLeft: "0.5rem" }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "medium" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

interface CalendarProps {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  availableDates?: Slots;
  upcomingworkouts?: Booking[]; // Ensure you pass in upcoming workouts
}

const ProfileCalendar: React.FC<CalendarProps> = ({
  setDate,
  date,
  availableDates,
  upcomingworkouts
}) => {

  // Generate a set of dates that have upcoming workouts
  const upcomingDates = new Set(
    upcomingworkouts?.map(workout => workout.date) || []
  );

  const shouldDisableDate = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD"); // Format the date to YYYY-MM-DD
    return !(availableDates && availableDates[formattedDate]); // Disable dates not in availableDates
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("MMMM D YYYY").replace(",", "");
      setDate(formattedDate);
    }
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Set the current date
  const today = dayjs();

  useEffect(() => {
    if (date) {
      const parsedDate = dayjs(date, "MMMM D YYYY");
      setSelectedDate(parsedDate.isValid() ? parsedDate : today); // Default to today if invalid
    } else {
      // Set the selected date to today if no date is provided
      setSelectedDate(today);
    }
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        showDaysOutsideCurrentMonth
        minDate={today} // Disable previous dates
        shouldDisableDate={shouldDisableDate}
        sx={{
          backgroundColor: "white",
          border: "none",
          borderRadius: "0px",
          padding: "3px 2rem",
          boxShadow: "none",
          width: "100%",
          height: "auto",
          ".MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
            padding: "0px 0.5rem",
          },
          ".MuiDayCalendar-header": {
            justifyContent: "space-between",
            padding: "0px 0.5rem",
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
            width: "36px",
            height: "36px",
          },
          ".MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#F6FFE5", // Faint green background for selected day
            color: "#323A3A",
            borderRadius: "50%",
            border: "1px solid #9EF300", // Optional: faint green border
            width: "36px",
            height: "36px",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#F6FFE5", // Keep the faint green on hover
              color: "#323A3A",
            },
          },
          ".MuiPickersDay-root.Mui-selected.Mui-focusVisible": {
            backgroundColor: "#F6FFE5", // Keep it the same as the selected state
            color: "#323A3A",
            outline: "none", // Remove any outline that could result in blue color
          },
          ".MuiPickersDay-root.Mui-current": {
            border: "2px solid #9EF300", // Black circle for today's date
            borderRadius: "50%",
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
        renderDay={(day, selectedDate, isInCurrentMonth) => {
          const isToday = day.isSame(today, "day"); // Check if the day is today
          const isSelected = selectedDate && day.isSame(selectedDate, "day"); // Check if the day is selected
          const hasUpcomingWorkout = upcomingDates.has(day.format("YYYY-MM-DD")); // Check if the day is in upcoming workouts

          return (
            <div
              className={`MuiPickersDay-root
                ${isToday ? "Mui-current" : ""}  // Always apply Mui-current to today
                ${isSelected && !isToday ? "Mui-selected" : ""}  // Apply Mui-selected only to the selected date
              `}
            >
              {day.date()}
              {hasUpcomingWorkout && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#9EF300", // Green dot
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default ProfileCalendar;
