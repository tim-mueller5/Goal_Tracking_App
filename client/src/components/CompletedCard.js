

function CompletedCard({ goal }) {

    const habitsNames = goal.habits.map((habit) => {
        const checkins = habit.checkins.map(checkin => {
            if(checkin.completed) 
                return <ul key={checkin.id} className="h-2 w-2 bg-green-300 rounded-full inline-block"></ul>
            else 
                return <ul key={checkin.id} className="h-2 w-2 bg-red-300 rounded-full inline-block"></ul>
            
        })
        if(habit.completed){
            return (
                <div key={habit.id}>
                    <li>&emsp; &emsp;{habit.name} - completed</li>
                    <li>&emsp; &emsp;{checkins}</li>
                </div>
            )
        } else return <li key={habit.id}>&emsp; &emsp;{habit.name} - Not completed</li>
    })
    const taskNames = goal.tasks.map((task) => {
        if(task.completed) {
            return <li key={task.id}>&emsp; &emsp;{task.name} - completed</li>
        } else return <li key={task.id}>&emsp; &emsp;{task.name} - Not completed</li>
        
    })


    return (
        <div className="m-4">
            <h2 className="font-bold">Goal: {goal.name}</h2>
            <ul>&emsp;Habits: {habitsNames}</ul>
            <br/>
            <ul>&emsp;Tasks: {taskNames}</ul>
        </div>
    )
}

export default CompletedCard;