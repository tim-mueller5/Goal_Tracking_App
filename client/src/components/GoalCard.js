import { useNavigate } from "react-router-dom";
import HabitCard from "./HabitCard";
import TaskCard from "./TaskCard";
import { UserContext } from "../context/user";
import { useContext } from "react";



function GoalCard({ goal, currentGoal, setCurrentGoal, inventory, setInventory }) {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    let dueDate
    let differenceInDays
    if (goal.due_date){
        const todayDate = new Date()
        dueDate = new Date(goal.due_date)
        const differenceInTime = dueDate.getTime() - todayDate.getTime()
        differenceInDays = differenceInTime/ (1000 * 3600 * 24)
    }

    const habitsToDisplay = goal.habits.map((habit) => <HabitCard key={habit.id} habit={habit} goal={goal} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} />)
    const tasksToDisplay = goal.tasks.map((task) => <TaskCard key={task.id} task={task} goal={goal} currentGoal={currentGoal} setCurrentGoal={setCurrentGoal}/>)

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
        }).then(() => giveReward()) 
        .catch(() => console.log("Caught Error in fetch!"))
    }

    const giveReward = () => {
            const num = Math.floor(Math.random() * 10)
            if (num > 0) {
                fetch(`/items`)
                .then(resp => resp.json())
                .then((items) => {
                    const num = Math.floor(Math.random() * items.length)
                    fetch(`/inventoryitems`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({user_id: user.id, item_id: items[num].id}),
                    }).then((resp) => resp.json())
                    .then((item)=> {
                        setInventory([...inventory, item])
                    })
                }
            )
        }
    }
    

    return (
        <div className="border-solid border-black border-2 mx-1 relative grid grid-cols-2 grid-rows-1">

            
            <div>
                <div className=" m-2 p-1">
                    <p className="text-lg font-bold">Habits for this goal: </p>
                    {habitsToDisplay}
                    <button onClick={addHabit} className='border-solid border-black border-2 px-1 m-1 block'>Add Habit to this goal</button>
                </div>
                
                <div className=" m-2 p-1">
                    <p className="text-lg font-bold">Tasks for this goal: </p>
                    {tasksToDisplay}
                    <button onClick={addTask} className='border-solid border-black border-2 px-1 m-1 block'>Add Task to this goal</button>
                </div>
            </div>
            
            <div className="border-solid border-black border-2 m-2 p-[25%] text-center">
                <p className="text-lg font-bold">Goal: {goal.name}</p>
                <p>Details: {goal.details}</p>
                {goal.due_date ? <p>Due Date: {dueDate.toLocaleDateString()}</p> : null}
                {goal.due_date ? <p>Days left: {Math.trunc(differenceInDays)}</p> : null}
                
                <button onClick={edit} className='border-solid border-black border-2 px-1 m-1'>Edit goal</button>
                <button onClick={deleteGoal} className='border-solid border-black border-2 px-1 m-1'>Delete Goal</button>
                <button onClick={handleComplete} className='border-solid border-black border-2 px-1 m-1'>Mark as Complete</button>
            </div>

        </div>
    )
}

export default GoalCard;