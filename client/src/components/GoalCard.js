import { useNavigate } from "react-router-dom";
import HabitCard from "./HabitCard";
import TaskCard from "./TaskCard";
import { UserContext } from "../context/user";
import { useContext, useEffect, useState } from "react";



function GoalCard({ goal, currentGoal, setCurrentGoal, inventory, setInventory, setNewItemMessage }) {

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
            if (num >+ 0) {
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
                        if(item.item.name.charAt(0).toLowerCase() === "a"){
                            setNewItemMessage(`An ${item.item.name} has been found!`)
                        }else{
                            setNewItemMessage(`A ${item.item.name} has been found!`)
                        }
                        
                    })
                }
            )
        }
    }
    
    const totalHabitsaAndTasks = (goal.habits.length) + (goal.tasks.length)
    const completedHabits = goal.habits.filter(habit => habit.completed).length
    const completedTasks = goal.tasks.filter(task => task.completed).length
    const completedHabitsAndTasks = completedHabits + completedTasks
    
    const [progressBar, setProgressBar] = useState(`bg-green-300 h-3 w-1/12 z-10 rounded-full`)
    const exactFraction = completedHabitsAndTasks/totalHabitsaAndTasks
    useEffect(() => {
        if(exactFraction >= 1){
            setProgressBar('bg-green-300 h-3 w-full z-10 rounded-full')
        } else if(exactFraction >= 11/12){
            setProgressBar('bg-green-300 h-3 w-11/12 z-10 rounded-full')
        } else if(exactFraction >= 10/12){
            setProgressBar('bg-green-300 h-3 w-10/12 z-10 rounded-full')
        } else if(exactFraction >= 9/12){
            setProgressBar('bg-green-300 h-3 w-9/12 z-10 rounded-full')
        } else if(exactFraction >= 8/12){
            setProgressBar('bg-green-300 h-3 w-8/12 z-10 rounded-full')
        } else if(exactFraction >= 7/12){
            setProgressBar('bg-green-300 h-3 w-7/12 z-10 rounded-full')
        } else if(exactFraction >= 6/12){
            setProgressBar('bg-green-300 h-3 w-6/12 z-10 rounded-full')
        } else if(exactFraction >= 5/12){
            setProgressBar('bg-green-300 h-3 w-5/12 z-10 rounded-full')
        } else if(exactFraction >= 4/12){
            setProgressBar('bg-green-300 h-3 w-4/12 z-10 rounded-full')
        } else if(exactFraction >= 3/12){
            setProgressBar('bg-green-300 h-3 w-3/12 z-10 rounded-full')
        } else if(exactFraction >= 2/12){
            setProgressBar('bg-green-300 h-3 w-2/12 z-10 rounded-full')
        } else if(exactFraction >= 1/12){
            setProgressBar("bg-green-300 h-3 w-1/12 z-10 rounded-full")
        } else{
            setProgressBar("bg-green-300 h-3 w-0 z-10 rounded-full")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goal])
    

    return (
        <div className="border-solid border-black border-2 mx-1 grid grid-cols-3 mb-2 font-display">

            
            <div className="col-span-2">
                <div className=" m-2 p-1">
                    <p className="text-xl font-bold">Habits for this goal: </p>
                    {habitsToDisplay}
                    <button onClick={addHabit} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Add Habit to this goal</button>
                </div>
                
                <div className=" m-2 p-1">
                    <p className="text-xl font-bold font-display">Tasks for this goal: </p>
                    {tasksToDisplay}
                    <button onClick={addTask} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Add Task to this goal</button>
                </div>
            </div>
            
            <div className="border-solid border-black border-2 rounded-lg shadow shadow-black m-2 p-[25%] text-center col-start-3">
                <p className="text-xl font-bold font-display">Goal: {goal.name}</p>
                <p className="font-display">Details: {goal.details}</p>
                {goal.due_date ? <p className="font-display">Due Date: {dueDate.toLocaleDateString()}</p> : null}
                {goal.due_date ? <p className="font-display">Days left: {Math.trunc(differenceInDays)}</p> : null}
                
                <button onClick={edit} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Edit goal</button>
                <button onClick={deleteGoal} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Delete Goal</button>
                <button onClick={handleComplete} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Mark as Complete</button>
                <p>Progress bar</p>
                <p>total: {totalHabitsaAndTasks}</p>
                <p>completed: {completedHabitsAndTasks}</p>
                <div className="bg-white h-3 w-full rounded-full">
                    <div className={progressBar}></div>
                </div>
            </div>

        </div>
    )
}

export default GoalCard;