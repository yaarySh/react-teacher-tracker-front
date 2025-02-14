import React, {useState, useEffect} from "react";
import Calendar from "react-calendar"; // Importing the calendar library
import {fetchClassesByDate} from "../scripts/api"; // Assuming your api functions are in api.js
import "react-calendar/dist/Calendar.css"; // Import default styles

const CalendarComponent = ({onDateChange}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  // Format date to YYYY-MM-DD for API
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle date change
  const onDateChangeHandler = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    fetchScheduleForDate(formattedDate);
    onDateChange(formattedDate);
  };

  // Fetch schedule for selected date
  const fetchScheduleForDate = async (date) => {
    try {
      const data = await fetchClassesByDate(date);
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    fetchScheduleForDate(formattedDate);
  }, []);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Select a Date</h2>
      <Calendar onChange={onDateChangeHandler} value={selectedDate} className="custom-calendar" />
    </div>
  );
};

export default CalendarComponent;
