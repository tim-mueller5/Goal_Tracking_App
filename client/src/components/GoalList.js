
import GoalCard from "./GoalCard";
import { UserContext } from "../context/user";
import { useContext } from "react";



function GoalList({ currentGoal, setCurrentGoal, inventory, setInventory }) {

    const {user} = useContext(UserContext);
    let goalsToDisplay

    if (user){
        goalsToDisplay = user.goals.map((goal) => {
            if(!goal.completed){
                return <GoalCard key={goal.id} goal={goal} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} inventory={inventory} setInventory={setInventory}/>
            } else{return null}
        })
    }
    

    return (
        <div className="relative overflow-auto min-h-screen font-display ">
            <div className="w-3/4 float-left">
                {(user != null)? goalsToDisplay : "No user"}
                <p>{goalsToDisplay.length > 1 ? null : "You have no goals!  Create a new goal!"}</p>
            </div>
            <div className="float-right w-1/4">
                <div className="border-solid border-black border-2 h-64 flex flex-col items-center">
                    Calander
                </div>
                <div className="border-solid border-black border-2 h-64 flex flex-col items-center">
                    Timer
                </div>
            </div>
        </div>
    )
}

export default GoalList;