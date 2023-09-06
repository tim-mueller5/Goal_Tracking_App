import HabitCard from "./HabitCard";
import TaskCard from "./TaskCard";


function GoalCard({ goal }) {

    const habitsToDisplay = goal.habits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
    const tasksToDisplay = goal.tasks.map((task) => <TaskCard key={task.id} task={task}/>)

    return (
        <div>
            <h2>GoalCard Component</h2>
            <p>Goal: {goal.name}</p>
            <p>Habits for this goal: </p>
            {habitsToDisplay}
            <p>Tasks for this goal: </p>
            {tasksToDisplay}
        </div>
    )
}

export default GoalCard;