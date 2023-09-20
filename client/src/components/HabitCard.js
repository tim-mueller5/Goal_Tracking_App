import { useNavigate } from "react-router-dom";
import HabitCheckIn from "./HabitCheckIn";
import { UserContext } from "../context/user";
import { useContext } from "react";


function HabitCard({ habit, goal, currentGoal, setCurrentGoal, daysLeft }) {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const edit = () => {
        setCurrentGoal(goal)
        navigate(`/edit-habit/${habit.id}/${habit.name}`)
    }

    const dates = habit.checkins.map((checkin) => checkin.date).sort()
    const sortedcheckins = []
    dates.map(date => {
        const thing = habit.checkins.filter(checkin => {
            if (checkin.date === date){
                return checkin
            }
        })
        sortedcheckins.push(thing[0])
        return thing
    });


    let CheckInCardsToDisplay = sortedcheckins.map((checkin) => <HabitCheckIn key={checkin.id} checkin={checkin}/>)


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
            body: JSON.stringify({completed: !habit.completed}),
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
                    const goals = user.goals.map((thisGoal) => {
                        if(thisGoal.id === goal.id){
                            return {...goal, habits:habits}
                        }else{
                            return thisGoal
                        }
                    })
                    setUser({...user, goals:goals})
                })
            }
        }).catch(() => console.log("Caught Error in fetch!"))
    }

    return (
        <div  className=" mx-2 p-1 font-display">
            <h4 className="text-lg font-bold">Habit: {habit.name}</h4>
            <h5>&emsp;Habit Daily Checkins:</h5>
            <div className="max-h-24 flex overflow-x-auto overflow-y-hidden">
                {habit.completed ? null : CheckInCardsToDisplay}
            </div>
            { habit.completed ? 
                <div className="flex">
                    <p>Completed!</p>
                    <button onClick={handleCompelete} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Undo complete</button>
                </div>
                : <div>
                    <button onClick={edit} className='border-solid border-black border-2 text-sm px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Edit Habit</button>
                    <button onClick={handleDelete} className='border-solid border-black border-2 text-sm px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Delete Habit</button>
                    <button onClick={handleCompelete} className='border-solid border-black border-2 text-sm px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Mark as Complete</button>
                </div>}
        </div>
    )
}

export default HabitCard;