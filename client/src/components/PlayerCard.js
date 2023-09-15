import { UserContext } from "../context/user";
import { useContext } from "react";


function PlayerCard({ inventory }) {
    const {user} = useContext(UserContext);
    const weapon = inventory.map((item) => {
        if(item.equipped && item.id === user.equipped_weapon){
            return item.item
        } else return null
    })
    return (
        <div className="border-black border-solid border-2 m-1">
            <p>User: {user.username}</p>
            <p>Health: {user.current_health}/{user.max_health}</p>
            <p>Equiped Weapon: {user.equipped_weapon ? "l" : "none"}</p>
        </div>
    )
}

export default PlayerCard