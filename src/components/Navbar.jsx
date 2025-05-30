import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import './Navbar.css';
import Home from "../pages/Home";
import { UserContext } from "../App";
import { useContext } from "react";

const Navbar = () => {
  // console.log("navbar")

  const [menuOpen, setMenuOpen] = useState(false);
  const {user, setUser} = useContext(UserContext);

  return (
   
    <div className="w-full bg-white shadow-md">
      <header className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <span className="text-xl font-bold text-blue-600">The Diary App</span>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">

          <NavLink
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </NavLink>

          {
            user ? (<div>
             <NavLink to='/logout'> Logout</NavLink>
          </div>) : (
        
          <div>  <NavLink
          to="/login"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Signup
        </NavLink> </div>)
          }
         
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className="block text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-center font-medium"
              >
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
