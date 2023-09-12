import { useNavigate } from 'react-router-dom';
import CompletedCard from './CompletedCard';

function CompletedGoals({ user }) {

    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

    let completedGoalsToDisplay

    if(user) {
        completedGoalsToDisplay = user.goals.map((goal) => {
            if(goal.completed){
                return <CompletedCard key={goal.id} goal={goal}/>
            }
        })
    }
    



    return (
        <div>
            <h1>Completed Habits</h1>
            {completedGoalsToDisplay}
            <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button>
        </div>
    )
}

export default CompletedGoals;