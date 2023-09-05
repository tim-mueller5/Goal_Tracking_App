import { useNavigate } from 'react-router-dom';

function NavBar({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogOut = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null) )
        .then(navigate(`/login`))
    }

    const createNewGoal = () => {
        
    }

    return (
        <div>
            <h3>NavBar Component</h3>
            <button>Create New Goal</button>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default NavBar;