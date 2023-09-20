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
            <div className='grid grid-cols-2 grid-rows-2 max-w-sm m-auto'>
                <button onClick={goCreateGoal} className='border-solid border-black border-2 px-4 m-1 max-h-14 h-12 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'> Create New Goal </button>
                <button onClick={viewCompleted} className='border-solid border-black border-2 px-4 m-1 max-h-14 h-12 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Completed Goals</button>
                <button onClick={handleLogOut} className='border-solid border-black border-2 px-4  col-span-2 max-h-14 w-32 m-auto bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'> Log Out </button>
            </div>
            <div className='flex flex-col items-center'>
                <PlayerCard inventory={inventory}/>
            </div>
            <div className='grid grid-cols-2 grid-rows-2 max-w-sm m-auto'>
                <button onClick={goInventory} className='border-solid border-black border-2 px-4 m-1 max-h-14 h-12 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Inventory</button>
                <button onClick={goFight} className='border-solid border-black border-2 px-4 m-1 max-h-14 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Fight Monster</button>
                <button onClick={goHome} className='border-solid border-black border-2 px-4 col-span-2 max-h-14 w-32 m-auto bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'> Home </button>
            </div>
        </div>
    )
}

export default NavBar;