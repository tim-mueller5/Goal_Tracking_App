import { useEffect } from "react";
import GoalCard from "./GoalCard";



function GoalList({ user, setUser }) {
    let goalsToDisplay

    if (user != null){
        goalsToDisplay = user.goals.map((goal) => <GoalCard key={goal.id} goal={goal}/>)
    }
    

    

    return (
        <div>
            <h2>Goal List Component</h2>
            {(user != null)? goalsToDisplay : "No user"}
        </div>
    )
}

export default GoalList;