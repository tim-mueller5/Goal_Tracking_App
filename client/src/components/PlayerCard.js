

function PlayerCard({ user }) {


    return (
        <div className="border-black border-solid border-2">
            <p>User: {user.username}</p>
            <p>Health: {user.max_health}/{user.current_health}</p>
            <p></p>
        </div>
    )
}

export default PlayerCard