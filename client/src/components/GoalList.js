
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
        <div className="relative">
            <div className="w-3/4 float-left">
                {(user != null)? goalsToDisplay : "No user"}
            </div>
            <div>
                Calander
            </div>
            <div>
                Timer
            </div>
        </div>
    )
}

export default GoalList;