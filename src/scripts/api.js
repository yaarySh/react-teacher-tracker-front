import axios from "axios";

const HOST = "https://react-teacher-tracker.onrender.com/";

// Function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding token to each request's headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    const response = await api.post("teachers/login/", {username, password});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, password, confirmPassword) => {
  try {
    const response = await api.post("teachers/register/", {
      username,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch teacher's schedule
export const fetchSchedule = async () => {
  try {
    const response = await api.get("classes/teacher");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a class
export const deleteClass = async (classId) => {
  try {
    const response = await api.delete(`classes/${classId}/delete/`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Toggle attendance for a class
export const toggleAttendance = async (classId, attendedStatus) => {
  try {
    const response = await api.put(`teachers/class/${classId}/update/`, {
      attended: attendedStatus,
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Create a new class
export const createClass = async (period, gradeLetter, classNumber, selectedDate) => {
  const requestBody = {
    classroom: {
      grade_letter: gradeLetter,
      class_number: parseInt(classNumber, 10),
    },
    period: period,
    date: selectedDate, // Use the selected date instead of today's date
    attended: false,
  };

  try {
    const response = await api.post("classes/create/", requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClass = async (classId, gradeLetter, classNumber, date, attended) => {
  const requestBody = {
    grade_letter: gradeLetter,
    class_number: classNumber,
    date: date,
    attended: attended,
  };

  try {
    const response = await api.put(`classes/${classId}/`, requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchClassesByDate = async (date) => {
  try {
    const response = await api.get(`classes/date/${date}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch teacher's hours worked by month and year
export const fetchMonthlyClasses = async () => {
  try {
    const response = await api.get(`classes/monthly-hours`);

    return response.data;
  } catch (error) {
    console.error("Error fetching monthly hours:", error);
    throw error;
  }
};
