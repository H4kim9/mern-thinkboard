export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",  // Use abbreviated month names (e.g., Jan, Feb)
    day: "numeric",  // Display the day as a number (e.g., 1, 2, 3)
    year: "numeric", // Display the year as a number (e.g., 2025)
  });
}
