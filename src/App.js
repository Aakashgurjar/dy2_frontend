import React, {createContext, useMemo, useState } from "react";
import { Routes, useRoutes, Route, Navigate} from 'react-router-dom';
import Layout from "./pages/Layout";
import Home from './pages/Home'
// import Navbar from "./components/Navbar";
import DiaryPost from "./pages/DiaryPost";
import Signup from "./pages/Signup";
import Login from './pages/Login'
import { useEffect } from "react";

const UserContext = createContext();

function App() {
 
  const [user, setUser] = useState(null);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    // Sync user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

   const elements = useRoutes([{
      path: '/', element: <Layout />,
      children: [
        {path: '/', element: <Home /> },
        {path: '/api/posts/:id',element: user ? <DiaryPost/> : <Navigate to='/logout' />},
        {path: '/login',  element: !user ? <Login />  : <Navigate to='/' />},
        {path:  '/signup', element: !user ?  <Signup /> : <Navigate to='/' />}
        
      ]
     }])

     return (
      <UserContext.Provider value={{ user, setUser, updateList, setUpdateList }}>
        {elements}
      </UserContext.Provider>
    );
 
}

export default App;
export {UserContext}
