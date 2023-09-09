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
        <div>
            <h2>NavBar Component</h2>
            <button onClick={goCreateGoal}>Create New Goal</button>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default NavBar;