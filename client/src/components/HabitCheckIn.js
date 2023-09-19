import React, { useState } from "react";


function HabitCheckIn ({ checkin }) {

    const date = new Date(checkin.date).toLocaleDateString()
    const [isComleted, setIsComleted]  = useState(checkin.completed)
    let design = "border-solid border-black border-2 text-sm rounded-full inline-block mx-1 px-2 pt-1 font-thin font-display text-center"

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
    if(isComleted === true){
        design = "border-solid border-black border-2 text-sm rounded-full inline-block mx-1 px-2 pt-1 font-thin font-display text-center bg-green-300"
    }

    return (
        <div className={design}>
            <p className="">{date}</p>
            {isComleted ? 
            <p className="">Completed</p>
            : <button onClick={handleCompelete} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Complete</button>}
        </div>
    )
}

export default HabitCheckIn