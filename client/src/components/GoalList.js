
import GoalCard from "./GoalCard";



function GoalList({ user, setUser, currentGoal, setCurrentGoal }) {
    let goalsToDisplay

    if (user){
        goalsToDisplay = user.goals.map((goal) => <GoalCard key={goal.id} goal={goal} user={user} setUser={setUser} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} />)
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