import { useNavigate } from "react-router-dom";

function HabitCard({ habit, goal, user, setUser, setCurrentGoal }) {

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
                    if(thisHabit.id != habit.id){
                        return thisHabit
                    }
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

    return (
        <div>
            <h4>Habit Card Component: {habit.name}</h4>
            <button onClick={edit}>Edit Habit</button>
            <button onClick={handleDelete}>Delete Habit</button>
        </div>
    )
}

export default HabitCard;