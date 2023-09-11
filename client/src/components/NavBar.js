import { Link, useNavigate } from 'react-router-dom';

function NavBar({ setUser }) {

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

    return (
        <div className='border-solid border-black border-4'>
            <button onClick={goCreateGoal} className='border-solid border-black border-2'> Create New Goal </button>
            <button onClick={handleLogOut} className='border-solid border-black border-2'> Log Out </button>
        </div>
    )
}

export default NavBar;