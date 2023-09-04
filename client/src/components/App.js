import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Home from "./Home";

function App() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/login`)
  }, [])
  

  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login user={user} setUser={setUser}/>}/>
        <Route exact path="/home" element={<Home user={user} setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
