function convertToMinutes(duration: string): number {
  if (duration.endsWith("h")) {
    const hours = parseFloat(duration.slice(0, -1)); // remove 'h' and convert to number
    return hours * 60; // convert hours to minutes
  } else if (duration.endsWith("m")) {
    return parseFloat(duration.slice(0, -1)); // remove 'm' and return as minutes
  } else {
    throw new Error("Invalid duration format. Must end with 'h' or 'm'.");
  }
}

export default convertToMinutes;
