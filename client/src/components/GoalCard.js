import { useNavigate } from "react-router-dom";
import HabitCard from "./HabitCard";
import TaskCard from "./TaskCard";
import { useEffect } from "react";


function GoalCard({ goal, user, setUser, currentGoal, setCurrentGoal }) {

    const navigate = useNavigate();
    let dueDate
    let differenceInDays

    if (goal.due_date){

        const todayDate = new Date()
        dueDate = new Date(goal.due_date)
        console.log(todayDate)
        console.log(dueDate);
        const differenceInTime = dueDate.getTime() - todayDate.getTime()
        console.log(differenceInTime)
        differenceInDays = differenceInTime/ (1000 * 3600 * 24)
        console.log(differenceInDays)
    }

    const habitsToDisplay = goal.habits.map((habit) => <HabitCard key={habit.id} habit={habit} goal={goal} user={user} setUser={setUser} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} />)
    const tasksToDisplay = goal.tasks.map((task) => <TaskCard key={task.id} task={task} goal={goal} user={user} setUser={setUser} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal}/>)

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

    const handleComplete = () => {
        setCurrentGoal(goal)
        fetch(`/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({completed: true}),
        }).then((resp) => {
            if (resp.ok) {
                resp = resp.json().then((newGoal) => {
                    const goals = user.goals.map((goal) => {
                        if(goal.id === newGoal.id){
                            return newGoal
                        }else{
                            return goal
                        }
                    })
                    setUser({...user, goals:goals})
                })
            }
        }).catch(() => console.log("Caught Error in fetch!"))
    }


    return (
        <div className="border-solid border-black border-2 m-1 relative ">

            <div className="border-solid border-black border-2 m-2 p-1 float-right absolute top-10 bottom-10 right-10 ">
                <p className="text-lg font-bold">Goal: {goal.name}</p>
                <p>Details: {goal.details}</p>
                {goal.due_date ? <p>Due Date: {dueDate.toLocaleDateString()}</p> : null}
                {goal.due_date ? <p>Days left: {Math.trunc(differenceInDays)}</p> : null}
                
                <button onClick={edit} className='border-solid border-black border-2 px-1 m-1 block'>Edit goal</button>
                <button onClick={deleteGoal} className='border-solid border-black border-2 px-1 m-1 block'>Delete Goal</button>
                <button onClick={handleComplete} className='border-solid border-black border-2 px-1 m-1 block'>Mark as Complete</button>
            </div>
            
            <div className="border-solid border-black border-2 m-2 p-1">
                <p>Habits for this goal: </p>
                {habitsToDisplay}
                <button onClick={addHabit} className='border-solid border-black border-2 px-1 m-1 block'>Add Habit to this goal</button>
            </div>
            
            <div className="border-solid border-black border-2 m-2 p-1">
                <p>Tasks for this goal: </p>
                {tasksToDisplay}
                <button onClick={addTask} className='border-solid border-black border-2 px-1 m-1 block'>Add Task to this goal</button>
            </div>

        </div>
    )
}

export default GoalCard;