import { useNavigate } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import { UserContext } from "../context/user";
import { useContext } from "react";

function NavBar({ inventory, navDisplay }) {

    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null) )
        .then(navigate(`/`))
    }

    const goCreateGoal = () => {
        navigate('/create-goal')
    }

    const viewCompleted = () => {
        navigate('/completed')
    }

    const goFight = () => {
        navigate('/fight')
    }

    const goInventory = () => {
        navigate('/inventory')
    }

    const goHome = () => {
        navigate('/')
    }

    return (
        <div className={navDisplay}>
            <div className='grid grid-cols-2 grid-rows-2'>
                <button onClick={goInventory} className='border-solid border-black border-2 px-1 m-1 hover:shadow-black hover:shadow'>Inventory</button>
                <button onClick={goFight} className='border-solid border-black border-2 px-1 m-1 hover:shadow-black hover:shadow'>Fight Monster</button>
            </div>
            <div className='flex flex-col items-center'>
                <PlayerCard inventory={inventory}/>
            </div>
            <div className='grid grid-cols-2 grid-rows-2'>
                <button onClick={goCreateGoal} className='border-solid border-black border-2 px-1 m-1 bg-red-500 hover:shadow-black hover:shadow'> Create New Goal </button>
                <button onClick={viewCompleted} className='border-solid border-black border-2 px-1 m-1 hover:shadow-black hover:shadow'>View Completed Goals</button>
                <button onClick={goHome} className='border-solid border-black border-2 px-1 m-1 hover:shadow-black hover:shadow'> Home </button>
                <button onClick={handleLogOut} className='border-solid border-black border-2 px-1 m-1 hover:shadow-black hover:shadow'> Log Out </button>
            </div>
        </div>
    )
}

export default NavBar;