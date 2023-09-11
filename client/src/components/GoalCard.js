import { useNavigate } from "react-router-dom";
import HabitCard from "./HabitCard";
import TaskCard from "./TaskCard";


function GoalCard({ goal, user, setUser, setCurrentGoal }) {

    const navigate = useNavigate();

    const habitsToDisplay = goal.habits.map((habit) => <HabitCard key={habit.id} habit={habit} goal={goal} user={user} setUser={setUser} setCurrentGoal={setCurrentGoal} />)
    const tasksToDisplay = goal.tasks.map((task) => <TaskCard key={task.id} task={task} goal={goal} setCurrentGoal={setCurrentGoal}/>)

    const edit = () => {
        setCurrentGoal(goal)
        navigate(`/edit-goal`)
    }

    const addHabit = () => {
        setCurrentGoal(goal)
        navigate("/create-goal/habit") 
    }

    const addTask =() => {
        setCurrentGoal(goal)
        navigate("/create-goal/task")
    }

    const deleteGoal = () => {
        fetch(`/goals/${goal.id}`, {
            method: "DELETE",
        }).then((resp) => {
            if(resp.ok) {
                const newGoals = user.goals.filter((thisGoal) => {
                    if(thisGoal.id != goal.id){
                        return thisGoal
                    }
                })
                setUser({...user, goals:newGoals})
            }
        })
    }

    return (
        <div style={{borderStyle: "solid"}}>
            <h2>GoalCard Component</h2>
            <button onClick={edit}>Edit goal</button>
            <button onClick={deleteGoal}>Delete Goal</button>
            <p>Goal: {goal.name}</p>
            <p>Habits for this goal: </p>
            {habitsToDisplay}
            <button onClick={addHabit}>Add Habit to this goal</button>
            <p>Tasks for this goal: </p>
            {tasksToDisplay}
            <button onClick={addTask}>Add Task to this goal</button>
        </div>
    )
}

export default GoalCard;