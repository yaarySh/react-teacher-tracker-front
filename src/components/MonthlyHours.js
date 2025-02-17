import React, {useState, useEffect} from "react";
import {fetchMonthlyClasses} from "../scripts/api";

// Function to get the last 12 months in a structured format
const getLast12Months = () => {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);

    months.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1, // Month as a number (1-12)
      monthName: date.toLocaleString("default", {month: "long"}), // Full month name
    });
  }

  return months.reverse(); // Chronological order
};

const MonthlyHours = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMonthlyClasses();
        const months = getLast12Months();

        // Map API response to match last 12 months
        const formattedData = months.map(({year, month, monthName}) => {
          const found = response.find((entry) => entry.date__year === year && entry.date__month === month);

          return {
            month: `${monthName} ${year}`,
            total_hours: found ? found.total_hours : 0,
          };
        });

        setMonthlyData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Hours Worked (Past Year)</h3>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Month</th>
                    <th>Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.month}</td>
                      <td>{data.total_hours} hours</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyHours;
