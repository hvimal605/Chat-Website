export function formatISODate(isoString) {
    // Check if the input is a valid ISO 8601 string
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(isoString)) {
      throw new Error("Invalid ISO 8601 string provided.");
    }
  
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }
  
  // Example usage:
  const isoString = "2024-06-20T09:56:31.140Z";
  const formattedDate = formatISODate(isoString);
  // console.log(formattedDate); // Output: "June 20, 2024"
  