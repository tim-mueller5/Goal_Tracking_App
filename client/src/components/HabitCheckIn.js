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
        <div className="border-solid border-black border-2 inline-block m-1 p-1 font-thin h-20 w-32">
            <p > Check-in for  </p>
            {date}
            {isComleted ? 
            <p>Completed</p>
            : <button onClick={handleCompelete} className='border-solid border-black border-2 px-1 flex'>Mark Complete</button>}
        </div>
    )
}

export default HabitCheckIn