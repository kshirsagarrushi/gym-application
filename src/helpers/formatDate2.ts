function formatDate2(dateString: string): string {
  const date = new Date(dateString); // Parse the input string into a Date object

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format"); // Check if the date is valid
  }

  const year = date.getFullYear(); // Get the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so we add 1) and pad to two digits
  const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad to two digits

  return `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD
}

export default formatDate2;
