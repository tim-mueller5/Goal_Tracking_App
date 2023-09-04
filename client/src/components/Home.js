import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'

function Home({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogOut = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null) )
        .then(navigate(`/login`))
    }


    return (
        <div>
            <h1>Home Page</h1>
            <NavBar/>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Home;