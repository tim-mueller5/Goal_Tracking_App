import { useNavigate } from 'react-router-dom';

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
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Home;