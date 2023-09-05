import { useEffect } from "react";
import GoalCard from "./GoalCard";



function GoalList({ user, setUser }) {
    let goalsToDisplay

    console.log(user)
    if (user != null){
        goalsToDisplay = user.goals.map((goal) => <GoalCard key={goal.id} goal={goal}/>)
    }
    

    

    return (
        <div>
            <h3>Goal List Component</h3>
            {(user != null)? goalsToDisplay : "No user"}
        </div>
    )
}

export default GoalList;