import React, { useState } from "react";


function HabitCheckIn ({ checkin }) {

    const date = new Date(checkin.date).toLocaleDateString()
    const [isComleted, setIsComleted]  = useState(checkin.completed)

    function handleCompelete() {
        fetch(`/checkins/${checkin.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({completed: true})
        })
        setIsComleted(!isComleted)
    }

    return (
        <div>
            <p className="inline"> Check-in for {date} </p>
            {isComleted ? 
            <p>Completed</p>
            : <button onClick={handleCompelete} className='border-solid border-black border-2 px-1'>Mark as Complete</button>}
        </div>
    )
}

export default HabitCheckIn