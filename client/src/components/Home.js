import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from './NavBar'
import GoalList from './GoalList';
import CreateGoal from "./CreateGoal"
import CreateHabit from "./CreateHabit"
import CreateTask from "./CreateTask";
import EditGoal from "./EditGoal";
import EditHabit from "./EditHabit";
import EditTask from "./EditTask";



function Home({ user, setUser }) {

    const [currentGoal, setCurrentGoal] = useState(null)

    return (
        <div>
            <NavBar setUser={setUser}/>
            
            <Routes>
                <Route path="/" element={<GoalList user={user} setUser={setUser} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} />}/>
                <Route path="/create-goal" element={<CreateGoal user={user} setUser={setUser} />}/>
                <Route path="/create-goal/habit" element={<CreateHabit user={user} setUser={setUser} currentGoal={currentGoal} />}/>
                <Route path="/create-goal/task" element={<CreateTask user={user} setUser={setUser} currentGoal={currentGoal} />}/>
                <Route path="/edit-goal" element={<EditGoal user={user} setUser={setUser} currentGoal={currentGoal} />}/>
                <Route path="/edit-habit/:habitId/:habitName" element={<EditHabit user={user} setUser={setUser} currentGoal={currentGoal} />}/>
                <Route path="/edit-task/:taskId/:taskName" element={<EditTask user={user} setUser={setUser} currentGoal={currentGoal} />}/>
            </Routes>
        </div>
    )
}

export default Home;