import React, {useEffect, useState, useRef, useContext} from "react";
import {fetchSchedule, deleteClass, toggleAttendance, createClass, fetchClassesByDate} from "../scripts/api";
import CalendarComponent from "./calendarSelection"; // Import the CalendarComponent
import {TeacherContext} from "../TeacherContext"; // Import the context

const TeacherSchedule = () => {
  const {teacher, setTeacher} = useContext(TeacherContext); // Use context for teacher data
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const gradeRefs = useRef([]);
  const numberRefs = useRef([]);

  useEffect(() => {
    if (teacher) {
      // Only fetch if a teacher is logged in
      fetchSchedule()
        .then((data) => {
          setTeacher(data.teacher || null);
          setSchedule(data.data || []);
        })
        .catch((error) => alert("Error fetching schedule"));
    }
  }, [teacher, setTeacher]); // Depend on teacher state

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchScheduleForDate(date);
  };

  const fetchScheduleForDate = async (date) => {
    try {
      const data = await fetchClassesByDate(date);
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleDeleteClass = async (class_id) => {
    const success = await deleteClass(class_id);
    if (success) {
      setSchedule((prev) => prev.filter((item) => item.id !== class_id));
    }
  };

  const handleToggleAttendance = async (class_id, attendedStatus) => {
    const success = await toggleAttendance(class_id, attendedStatus);
    if (success) {
      setSchedule((prev) => prev.map((item) => (item.id === class_id ? {...item, attended: attendedStatus} : item)));

      fetchSchedule()
        .then((data) => {
          setTeacher((prev) => ({
            ...prev,
            monthly_hours: data.teacher?.monthly_hours || 0,
          }));
        })
        .catch((error) => alert("Error fetching teacher's updated data"));
    }
  };

  const handleCreateClass = async (period, index) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    const gradeLetter = gradeRefs.current[index].value;
    const classNumber = numberRefs.current[index].value;

    const newClass = await createClass(period, gradeLetter, classNumber, selectedDate);
    if (newClass) {
      setSchedule((prev) => [...prev, newClass]);

      fetchSchedule()
        .then((data) => {
          setTeacher((prev) => ({
            ...prev,
            monthly_hours: data.teacher?.monthly_hours || 0,
          }));
        })
        .catch((error) => alert("Error fetching teacher's updated data"));
    }
  };

  const renderRows = () => {
    return Array.from({length: 6}, (_, i) => {
      const period = i + 1;
      const classForPeriod = schedule.find((item) => item.period === period && item.date === selectedDate);

      if (classForPeriod) {
        return (
          <tr key={period}>
            <td>{period}</td>
            <td>{`${classForPeriod.classroom.grade_letter}${classForPeriod.classroom.class_number}`}</td>
            <td>{classForPeriod.classroom.building_name}</td>
            <td>{classForPeriod.classroom.floor_number}</td>
            <td>{classForPeriod.date}</td>
            <td>
              <button
                className={`btn btn-${classForPeriod.attended ? "success" : "danger"} btn-sm`}
                onClick={() => handleToggleAttendance(classForPeriod.id, !classForPeriod.attended)}
              >
                {classForPeriod.attended ? "Yes" : "No"}
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClass(classForPeriod.id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={period}>
            <td>{period}</td>
            <td>
              <select ref={(el) => (gradeRefs.current[i] = el)} className="form-select">
                {["א", "ב", "ג", "ד", "ה", "ו"].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              <select ref={(el) => (numberRefs.current[i] = el)} className="form-select">
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary btn-sm mt-2" onClick={() => handleCreateClass(period, i)}>
                Apply
              </button>
            </td>
            <td colSpan="4" className="text-center">
              No class scheduled
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <div className="container my-5">
      <div className="mb-4">
        <h4 className="text-start">Teacher: {teacher?.username || "No data available"}</h4>
        <h4 className="text-end">Monthly Hours: {teacher?.monthly_hours || 0}</h4>
      </div>

      <h2 className="text-center">Teacher's Schedule</h2>

      <div className="text-center">
        <CalendarComponent onDateChange={handleDateChange} />
      </div>

      {selectedDate && <h4 className="text-center">Schedule for {selectedDate}</h4>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Period</th>
            <th>Classroom</th>
            <th>Building Name</th>
            <th>Floor Number</th>
            <th>Date</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={() => localStorage.removeItem("token") || (window.location.href = "/login")}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherSchedule;
