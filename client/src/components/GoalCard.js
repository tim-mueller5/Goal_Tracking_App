import { useNavigate } from "react-router-dom";
import HabitCard from "./HabitCard";
import TaskCard from "./TaskCard";


function GoalCard({ goal, user, setUser, setCurrentGoal }) {

    const navigate = useNavigate();

    const habitsToDisplay = goal.habits.map((habit) => <HabitCard key={habit.id} habit={habit} goal={goal} user={user} setUser={setUser} setCurrentGoal={setCurrentGoal} />)
    const tasksToDisplay = goal.tasks.map((task) => <TaskCard key={task.id} task={task} goal={goal} user={user} setUser={setUser} setCurrentGoal={setCurrentGoal}/>)

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
                    if(thisGoal.id !== goal.id){
                        return thisGoal
                    }else{return null}
                })
                setUser({...user, goals:newGoals})
            }
        })
    }


    return (
        <div className="border-solid border-black border-2 m-1 relative">

            <div className="border-solid border-black border-2 m-2 p-1 float-right absolute top-10 bottom-10 right-10 ">
                <p className="text-lg font-bold">Goal: {goal.name}</p>
                <button onClick={edit} className='border-solid border-black border-2 px-1'>Edit goal</button>
                <button onClick={deleteGoal} className='border-solid border-black border-2 px-1'>Delete Goal</button>
            </div>
            
            <div className="border-solid border-black border-2 m-2 p-1">
                <p>Habits for this goal: </p>
                {habitsToDisplay}
                <button onClick={addHabit} className='border-solid border-black border-2 px-1 block'>Add Habit to this goal</button>
            </div>
            
            <div className="border-solid border-black border-2 m-2 p-1">
                <p>Tasks for this goal: </p>
                {tasksToDisplay}
                <button onClick={addTask} className='border-solid border-black border-2 px-1 block'>Add Task to this goal</button>
            </div>
        </div>
    )
}

export default GoalCard;