import NavBar from './NavBar'
import GoalList from './GoalList';

function Home({ user, setUser }) {



    return (
        <div>
            <h1>Home Page</h1>
            <NavBar user={user} setUser={setUser}/>
            <GoalList user={user} setUser={setUser}/>
        </div>
    )
}

export default Home;