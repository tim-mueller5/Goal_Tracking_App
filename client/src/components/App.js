import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import CreateGoal from "./CreateGoal"
import CreateHabit from "./CreateHabit"
import CreateTask from "./CreateTask";
import EditGoal from "./EditGoal";
import EditHabit from "./EditHabit";
import EditTask from "./EditTask";


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
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/home" element={<Home user={user} setUser={setUser} setGoal={setGoal}/>}/>
        <Route path="/home/create-goal" element={<CreateGoal user={user} setUser={setUser}/>}/>
        <Route path="/home/create-goal/habit" element={<CreateHabit goal={goal}/>}/>
        <Route path="/home/create-goal/task" element={<CreateTask goal={goal}/>}/>
        <Route path="/home/edit-goal/:goalId" element={<EditGoal goal={goal} setGoal={setGoal}/>}/>
        <Route path="/home/edit-habit/:habitId/:habitName" element={<EditHabit/>}/>
        <Route path="/home/edit-task/:taskId/:taskName" element={<EditTask/>}/>
      </Routes>
    </div>
  );
}

export default App;
