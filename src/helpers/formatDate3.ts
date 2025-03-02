function formatDate3(date: string, time: string): string {
  // Parse the input date string
  const dateObj = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }

  // Split the time string into hours, minutes, and AM/PM
  const [timePart, ampm] = time.split(" "); // e.g., "08:00" and "AM"
  const [hours, minutes] = timePart.split(":").map(Number); // e.g., 8 and 0

  let adjustedHours = hours;
  // Adjust the hours for AM/PM
  if (ampm === "PM" && hours !== 12) {
    adjustedHours += 12; // Convert PM hours to 24-hour format
  } else if (ampm === "AM" && hours === 12) {
    adjustedHours = 0; // Convert 12 AM to 00 hours
  }

  // Set the time on the Date object using the adjusted hours and minutes
  dateObj.setHours(adjustedHours, minutes, 0, 0); // Using local time

  // Manually create an ISO formatted string
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hoursFormatted = String(dateObj.getHours()).padStart(2, "0");
  const minutesFormatted = String(dateObj.getMinutes()).padStart(2, "0");

  // Return the manually formatted ISO string in the format YYYY-MM-DDTHH:mm:ss
  return `${year}-${month}-${day}T${hoursFormatted}:${minutesFormatted}:00`;
}

export default formatDate3;
