function formatDateTime4(dateString: string): string {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      month: "short", // short month name
      day: "numeric",
    };
  
    const formattedDate = date.toLocaleString("en-US", options);
  
    return formattedDate;
  }
  
  export default formatDateTime4;