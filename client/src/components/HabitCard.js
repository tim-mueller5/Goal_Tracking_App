import { useNavigate } from "react-router-dom";

function HabitCard({ habit, goal, user, setUser, currentGoal, setCurrentGoal }) {

    const navigate = useNavigate();

    const edit = () => {
        setCurrentGoal(goal)
        navigate(`/edit-habit/${habit.id}/${habit.name}`)
    }

    const handleDelete = () => {
        fetch(`/habits/${habit.id}`, {
            method: "DELETE",
        }).then((resp) => {
            if(resp.ok){
                const newHabits = goal.habits.filter((thisHabit) => {
                    if(thisHabit.id !== habit.id){
                        return thisHabit
                    }else{return null}
                })
                const newGoal = {...goal, habits:newHabits}
                const newGoals = user.goals.map((thisGoal) => {
                    if(thisGoal.id === goal.id){
                        return newGoal
                    } else{
                        return thisGoal
                    }
                })
                setUser({...user, goals:newGoals})
            }
        })
    }

    const handleCompelete = () => {
        setCurrentGoal(goal)
        fetch(`/habits/${habit.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({completed: true}),
        }).then((resp) => {
            if (resp.ok) {
                resp = resp.json().then((newHabit) => {
                    const habits = goal.habits.map((habit) => {
                        if(habit.id === newHabit.id){
                            return newHabit
                        }else{
                            return habit
                        }
                    })
                    const goals = user.goals.map((goal) => {
                        if(goal.id === currentGoal.id){
                            return {...currentGoal, habits:habits}
                        }else{
                            return goal
                        }
                    })
                    setUser({...user, goals:goals})
                })
            }
        }).then(() => {
            // navigate('/')
        }).catch(() => console.log("Caught Error in fetch!"))
    }

    return (
        <div  className="border-solid border-black border-2 m-2 p-1">
            <h4>Habit: {habit.name}</h4>
            { habit.completed ? 
                <p>Completed!</p>
                : <div>
                    <button onClick={edit} className='border-solid border-black border-2 px-1'>Edit Habit</button>
                    <button onClick={handleDelete} className='border-solid border-black border-2 px-1'>Delete Habit</button>
                    <button onClick={handleCompelete} className='border-solid border-black border-2 px-1'>Mark as Complete</button>
                </div>}
        </div>
    )
}

export default HabitCard;