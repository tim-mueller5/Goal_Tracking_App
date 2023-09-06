import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import CreateGoal from "./CreateGoal";

function App() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
        navigate('/home')
        console.log('Already logged in!')
      }
      else{
        navigate(`/login`)
        console.log('Not logged in yet.')
      }
    });
  }, [])
  

  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login user={user} setUser={setUser}/>}/>
        <Route exact path="/home" element={<Home user={user} setUser={setUser}/>}/>
        <Route exact path="/create-goal" element={<CreateGoal user={user} setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
