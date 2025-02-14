import React, {useState, useEffect} from "react";
import {fetchMonthlyHours} from "../scripts/api"; // Import the fetchMonthlyHours function

// Function to get the last 12 months (from the current date)
const getLast12Months = () => {
  const months = [];
  const currentDate = new Date();

  // Loop through the past 12 months
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    months.push(date);
  }

  return months.reverse(); // To display in chronological order from last to current month
};

const MonthlyHours = () => {
  const [monthlyData, setMonthlyData] = useState([]); // State to store monthly data

  useEffect(() => {
    // Function to fetch data for each month in the last 12 months
    const fetchData = async () => {
      const months = getLast12Months();
      const data = [];

      // Loop through the months and fetch the data for each month
      for (const month of months) {
        const year = month.getFullYear();
        const monthNumber = month.getMonth() + 1;

        try {
          // Fetch the monthly hours data using the fetchMonthlyHours function
          const response = await fetchMonthlyHours(year, monthNumber);
          data.push({
            month: response.month, // Month name (e.g., "January 2024")
            total_hours: response.total_hours, // Total hours for the month
          });
        } catch (error) {
          console.error(`Error fetching data for ${month.toLocaleString("default", {month: "long", year: "numeric"})}:`, error);
        }
      }

      setMonthlyData(data); // Set the fetched data to the state
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  return (
    <div>
      <h2>Hours Worked in the Past Year</h2>
      <ul>
        {monthlyData.length > 0 ? (
          monthlyData.map((data, index) => (
            <li key={index}>
              <strong>{data.month}:</strong> {data.total_hours} hours
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
};

export default MonthlyHours;
