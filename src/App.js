import "./App.css";
import {useState} from "react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import CartCotext from "./CartContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <CartCotext.Provider value={{cart, setCart}}>
        <Jumbotron />
        <Navbar />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </CartCotext.Provider>
    </>
  );
}

export default App;
