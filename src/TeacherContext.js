import {createContext, useState, useEffect} from "react";
import {fetchSchedule} from "./scripts/api";

export const TeacherContext = createContext();

export const TeacherProvider = ({children}) => {
  const [teacher, setTeacher] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if user is logged in

    if (token) {
      fetchSchedule()
        .then((data) => {
          setTeacher(data.teacher || null);
          setSchedule(data.data || []);
        })
        .catch(() => alert("Error fetching schedule"));
    }
  }, []); // Runs only once on mount

  return <TeacherContext.Provider value={{teacher, setTeacher, schedule, setSchedule}}>{children}</TeacherContext.Provider>;
};
