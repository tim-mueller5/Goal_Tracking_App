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
import CompletedGoals from "./CompletedGoals";
import Fight from "./Fight";
import Inventory from "./Inventory";
import MissingRoute from "./MissingRoute";
import { UserContext } from "../context/user";
import { useContext } from "react";



function Home() {

    const {user} = useContext(UserContext);
    const [currentGoal, setCurrentGoal] = useState(null)
    const [inventory, setInventory] = useState(user.inventory_items)
    const [navDisplay, setNavDisplay] = useState('border-solid border-stone-300 border-8 mb-2 p-4 grid grid-cols-3 grid-rows-1 rounded-b-3xl font-display')

    return (
        <div>
            <NavBar inventory={inventory} navDisplay={navDisplay}/>
            
            <Routes>
                <Route path="/" element={<GoalList currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} inventory={inventory} setInventory={setInventory}/>}/>
                <Route path="/create-goal" element={<CreateGoal />}/>
                <Route path="/create-goal/habit" element={<CreateHabit  currentGoal={currentGoal} />}/>
                <Route path="/create-goal/task" element={<CreateTask  currentGoal={currentGoal} />}/>
                <Route path="/edit-goal" element={<EditGoal  currentGoal={currentGoal} />}/>
                <Route path="/edit-habit/:habitId/:habitName" element={<EditHabit  currentGoal={currentGoal} />}/>
                <Route path="/edit-task/:taskId/:taskName" element={<EditTask  currentGoal={currentGoal} />}/>
                <Route path="/completed" element={<CompletedGoals  />}/>
                <Route path="/fight" element={<Fight inventory={inventory} setNavDisplay={setNavDisplay}/>}/>
                <Route path="/inventory" element={<Inventory inventory={inventory} setInventory={setInventory} />}/>
                <Route path="*" element={<MissingRoute/>}/>
            </Routes>
        </div>
    )
}

export default Home;