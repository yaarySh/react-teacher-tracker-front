import "./App.css";
import "./styles/tablestyles.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TeacherSchedule from "./components/TeacherSchedule";
import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import MonthlyHours from "./components/MonthlyHours";
import {TeacherProvider} from "./TeacherContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <TeacherProvider>
      <Jumbotron />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TeacherSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monthly-hours"
          element={
            <ProtectedRoute>
              <MonthlyHours />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </TeacherProvider>
  );
}

export default App;
