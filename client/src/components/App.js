import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import CreateGoal from "./CreateGoal"
import CreateHabit from "./CreateHabit"
import CreateTask from "./CreateTask";


function App() {

  const [user, setUser] = useState(null)
  const [goal, setGoal] = useState(null)
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
        <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
        <Route path="/home" element={<Home user={user} setUser={setUser}/>}/>
        <Route path="/home/create-goal" element={<CreateGoal user={user} setGoal={setGoal}/>}/>
        <Route path="/home/create-goal/habit" element={<CreateHabit goal={goal}/>}/>
        <Route path="/home/create-goal/task" element={<CreateTask goal={goal}/>}/>
      </Routes>
    </div>
  );
}

export default App;
