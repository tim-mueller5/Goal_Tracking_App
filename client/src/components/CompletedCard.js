

function CompletedCard({ goal }) {

    const habitsNames = goal.habits.map((habit) => `${habit.name}, `)
    const taskNames = goal.tasks.map((task) => `${task.name}, `)

    return (
        <div className="m-4">
            <h2 className="font-bold">Goal: {goal.name}</h2>
            <h3>&emsp;Habits: {habitsNames}</h3>
            <h3>&emsp;Tasks: {taskNames}</h3>
        </div>
    )
}

export default CompletedCard;