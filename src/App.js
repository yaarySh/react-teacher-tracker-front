import "./App.css";
import "./styles/tablestyles.css";
import {useState} from "react";
import TeacherSchedule from "./components/TeacherSchedule";
import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import CartCotext from "./CartContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MonthlyHours from "./components/MonthlyHours"; // Import the MonthlyHours component

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <CartCotext.Provider value={{cart, setCart}}>
        <Jumbotron />
        <Navbar />
        <Routes>
          <Route path="/" element={<TeacherSchedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/monthly-hours" element={<MonthlyHours />} /> {/* Add the new route */}
        </Routes>
        <Footer />
      </CartCotext.Provider>
    </>
  );
}

export default App;
