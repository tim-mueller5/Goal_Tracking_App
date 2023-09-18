
import GoalCard from "./GoalCard";
import { UserContext } from "../context/user";
import { useContext, useState, useEffect } from "react";



function GoalList({ currentGoal, setCurrentGoal, inventory, setInventory}) {

    const [newItemMessage, setNewItemMessage] = useState('')
    const {user} = useContext(UserContext);
    let goalsToDisplay

    useEffect(() => {
        setTimeout(() => {
            setNewItemMessage('')
        }, 3000)
    }, [newItemMessage])

    if (user){
        goalsToDisplay = user.goals.map((goal) => {
            if(!goal.completed){
                    return <GoalCard key={goal.id} goal={goal} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} inventory={inventory} setInventory={setInventory} setNewItemMessage={setNewItemMessage}/>
            } else{return null}
        })
    }
    

    return (
        <div className="relative overflow-auto min-h-screen font-display ">
            <p className="fixed top-56 left-1/2 bg-slate-500">{newItemMessage}</p>
            <div className="w-3/4 float-left">
                {(user != null)? goalsToDisplay : "No user"}
                <p className="m-4">{goalsToDisplay.length >= 1 ? null : "You have no goals!  Create a new goal!"}</p>
            </div>
            <div className="float-right w-1/4">
                <div className="border-black border-2 h-64 flex flex-col items-center">
                    Calander TBD
                </div>
                <div className="border-black border-2 h-64 flex flex-col items-center">
                    Timer TBD
                </div>
            </div>
        </div>
    )
}

export default GoalList;