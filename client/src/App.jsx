import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import { useSelector } from "react-redux"

export default function App () {
    return (
       <div className="wrapper bg-dark text-white">
            <Navbar title="Niro's Todos"/>
            <div className="container">
                <Routes>
                    <Route path="/" element={
                    <><ProtectedRoute /><Home /><ProtectedRoute /></>}/>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer />
       </div>
    ) 
}