

function CompletedCard({ goal }) {

    const habitsNames = goal.habits.map((habit) => {
        if(habit.completed){
            return `${habit.name}-completed, `
        } else return `${habit.name}-Not completed, `
    })
    const taskNames = goal.tasks.map((task) => {
        if(task.completed) {
            return `${task.name}-completed, `
        } else return `${task.name}-Not completed, `
        
    })

    return (
        <div className="m-4">
            <h2 className="font-bold">Goal: {goal.name}</h2>
            <h3>&emsp;Habits: {habitsNames}</h3>
            <h3>&emsp;Tasks: {taskNames}</h3>
        </div>
    )
}

export default CompletedCard;