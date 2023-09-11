
import GoalCard from "./GoalCard";



function GoalList({ user, setUser, setCurrentGoal }) {
    let goalsToDisplay

    if (user){
        goalsToDisplay = user.goals.map((goal) => <GoalCard key={goal.id} goal={goal} user={user} setUser={setUser} setCurrentGoal={setCurrentGoal} />)
    }
    

    return (
        <div className="border-solid border-black border-4">
            {(user != null)? goalsToDisplay : "No user"}
        </div>
    )
}

export default GoalList;