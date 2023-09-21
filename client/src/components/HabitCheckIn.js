import React, { useState } from "react";


function HabitCheckIn ({ checkin }) {

    const date = new Date(checkin.date).toLocaleDateString()
    const [isComleted, setIsComleted]  = useState(checkin.completed)
    let design = "border-solid border-black border-2 text-sm rounded-full flex m-auto px-2 font-thin font-display"

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
        design = "border-solid border-black border-2 text-sm rounded-full flex m-auto px-2 font-thin font-display bg-green-300"
    }

    return (
        <div className={design}>
            <p className=" m-auto">{date}</p>
            {isComleted ? 
            <p className="px-1  m-auto">Completed</p>
            : <button onClick={handleCompelete} className='border-solid border-black border-2 px-2 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Complete</button>}
            <p className="text-lg">&#8594;</p>
        </div>
    )
}

export default HabitCheckIn