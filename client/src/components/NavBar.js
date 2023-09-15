import { useNavigate } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import { UserContext } from "../context/user";
import { useContext } from "react";

function NavBar() {

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

    return (
        <div className='border-solid border-black border-8 mb-2 p-4 grid grid-cols-3 grid-rows-1'>
            <div>
                <button onClick={goInventory} className='border-solid border-black border-2 px-1 m-1'>Inventory</button>
                <button onClick={goFight} className='border-solid border-black border-2 px-1 m-1'>Fight Monster</button>
            </div>
            <div>
                <PlayerCard />
            </div>
            <div>
                <button onClick={goCreateGoal} className='border-solid border-black border-2 px-1 m-1'> Create New Goal </button>
                <button onClick={viewCompleted} className='border-solid border-black border-2 px-1 m-1'>View Completed Goals</button>
                <button onClick={handleLogOut} className='border-solid border-black border-2 px-1 m-1'> Log Out </button>
            </div>
        </div>
    )
}

export default NavBar;