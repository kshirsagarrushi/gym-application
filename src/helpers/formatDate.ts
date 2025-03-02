function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "long", // full month name
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  let formattedDate = date.toLocaleString("en-US", options);

  // Extract the month part from the formatted date
  const monthName = formattedDate.split(" ")[0];

  // Check if the month name is 3-4 letters long and adjust if necessary
  if (monthName.length > 4) {
    // Shorten the month name to first 3 letters
    formattedDate = formattedDate.replace(monthName, monthName.slice(0, 3));
  }

  return formattedDate.replace(" at", ",");
}

export default formatDateTime;
