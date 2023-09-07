import { useNavigate } from "react-router-dom";
import HabitCard from "./HabitCard";
import TaskCard from "./TaskCard";


function GoalCard({ goal, setGoal }) {

    const navigate = useNavigate();

    const habitsToDisplay = goal.habits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
    const tasksToDisplay = goal.tasks.map((task) => <TaskCard key={task.id} task={task}/>)

    const edit = () => {
        setGoal(goal)
        navigate(`/home/edit-goal/${goal.id}`)
    }

    const addHabit = () => {
        setGoal(goal)
        navigate("/home/create-goal/habit")
    }

    const addTask =() => {
        setGoal(goal)
        navigate("/home/create-goal/task")
    }

    return (
        <div style={{borderStyle: "solid"}}>
            <h2>GoalCard Component</h2>
            <button onClick={edit}>Edit goal</button>
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