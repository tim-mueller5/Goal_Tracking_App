

function PlayerCard({ user }) {


    return (
        <div className="border-black border-solid border-2">
            <p>User: {user.username}</p>
            <p>Health: {user.current_health}/{user.max_health}</p>
            <p></p>
        </div>
    )
}

export default PlayerCard