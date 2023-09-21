import { useNavigate } from 'react-router-dom';
import CompletedCard from './CompletedCard';
import { UserContext } from "../context/user";
import { useContext } from "react";


function CompletedGoals() {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();


    let completedGoalsToDisplay

    if(user) {
        completedGoalsToDisplay = user.goals.map((goal) => {
            if(goal.completed){
                return <CompletedCard key={goal.id} goal={goal}/>
            } else{return null}
        })
    }
    



    return (
        <div className='min-h-screen font-display grid justify-center '>
            <div className='w-96 overflow-visible'>
                <h1 className='text-xl font-bold'>Completed Goals: </h1>
                {completedGoalsToDisplay ? completedGoalsToDisplay : "You have no completed goals. You can do this!"}
            </div>
        </div>
    )
}

export default CompletedGoals;