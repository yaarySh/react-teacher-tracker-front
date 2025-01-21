import React, {useEffect, useState} from "react";
import axios from "axios";

const TeacherSchedule = () => {
  const [teacher, setTeacher] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const getToken = () => localStorage.getItem("token");

  const fetchScheduleData = async () => {
    const token = getToken();
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/classes/teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeacher(response.data.teacher || null);
      setSchedule(response.data.data || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      alert("Error fetching schedule. Please try again.");
    }
  };

  const deleteClass = async (class_id) => {
    const token = getToken();
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/classes/${class_id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        alert("Class deleted successfully!");
        fetchScheduleData();
      } else {
        alert("Error deleting class.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the class.");
    }
  };

  const toggleAttendance = async (class_id, attendedStatus) => {
    const token = getToken();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/teachers/class/${class_id}/update/`,
        {attended: attendedStatus},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Attendance status updated!");
        fetchScheduleData();
      } else {
        throw new Error("Failed to update attendance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating attendance.");
    }
  };

  const createClass = async (period, gradeLetter, classNumber) => {
    const requestBody = {
      classroom: {
        grade_letter: gradeLetter,
        class_number: parseInt(classNumber, 10),
      },
      period: period,
      date: new Date().toISOString().split("T")[0],
      attended: false,
    };

    const token = getToken();
    try {
      const response = await axios.post("http://127.0.0.1:8000/classes/create/", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.id) {
        fetchScheduleData();
      } else {
        alert("Failed to create class.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create class.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Adjust route as needed
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const renderRows = () => {
    const rows = [];
    for (let i = 1; i <= 6; i++) {
      const classForPeriod = schedule.find((item) => item.period === i);
      if (classForPeriod) {
        rows.push(
          <tr key={i}>
            <td>{i}</td>
            <td>{`${classForPeriod.classroom.grade_letter}${classForPeriod.classroom.class_number}`}</td>
            <td>{classForPeriod.classroom.building_name}</td>
            <td>{classForPeriod.classroom.floor_number}</td>
            <td>{classForPeriod.date}</td>
            <td>
              <button
                className={`btn btn-${classForPeriod.attended ? "success" : "danger"} btn-sm`}
                onClick={() => toggleAttendance(classForPeriod.id, !classForPeriod.attended)}
              >
                {classForPeriod.attended ? "Yes" : "No"}
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteClass(classForPeriod.id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      } else {
        rows.push(
          <tr key={i}>
            <td>{i}</td>
            <td>
              <select id={`grade-select-${i}`} className="form-select">
                {["א", "ב", "ג", "ד", "ה", "ו"].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              <select id={`number-select-${i}`} className="form-select">
                {[1, 2, 3, 4].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  const gradeLetter = document.getElementById(`grade-select-${i}`).value;
                  const classNumber = document.getElementById(`number-select-${i}`).value;
                  createClass(i, gradeLetter, classNumber);
                }}
                className="btn btn-primary btn-sm mt-2"
              >
                Apply
              </button>
            </td>
            <td colSpan="4" className="text-center">
              No class scheduled
            </td>
          </tr>
        );
      }
    }
    return rows;
  };

  return (
    <div className="container my-5">
      <div className="mb-4">
        <h4 className="text-start">Teacher: {teacher?.username || "No data available"}</h4>
        <h4 className="text-end">Monthly Hours: {teacher?.monthly_hours || 0}</h4>
      </div>
      <h2 className="text-center">Teacher's Schedule</h2>
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
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherSchedule;
