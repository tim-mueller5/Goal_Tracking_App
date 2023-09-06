import { Link, useNavigate } from 'react-router-dom';

function NavBar({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogOut = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null) )
        .then(navigate(`/login`))
    }

    // const goCreateGoal = () => {
    //     navigate('/home/create-goal')
    // }

    return (
        <div>
            <h2>NavBar Component</h2>
            {/* <button onClick={goCreateGoal}>Create New Goal</button> */}
            <Link to='/home/create-goal'>Create New Goal</Link>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default NavBar;