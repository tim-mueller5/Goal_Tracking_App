
import GoalCard from "./GoalCard";



function GoalList({ user, setCurrentGoal }) {
    let goalsToDisplay

    if (user){
        goalsToDisplay = user.goals.map((goal) => <GoalCard key={goal.id} goal={goal} setCurrentGoal={setCurrentGoal} />)
    }
    

    return (
        <div>
            <h2>Goal List Component</h2>
            {(user != null)? goalsToDisplay : "No user"}
        </div>
    )
}

export default GoalList;