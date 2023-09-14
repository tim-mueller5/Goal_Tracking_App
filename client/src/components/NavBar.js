import { useNavigate } from 'react-router-dom';

function NavBar({ user, setUser }) {

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

    return (
        <div className='border-solid border-black border-8 mb-2 p-4'>
            <button onClick={goFight} className='border-solid border-black border-2 px-1'>Fight Monster</button>
            <div>

            </div>
            <button onClick={goCreateGoal} className='border-solid border-black border-2 px-1 m-1'> Create New Goal </button>
            <button onClick={viewCompleted} className='border-solid border-black border-2 px-1 m-1'>View Completed Goals</button>
            <button onClick={handleLogOut} className='border-solid border-black border-2 px-1 m-1'> Log Out </button>
        </div>
    )
}

export default NavBar;