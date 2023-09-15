import { UserContext } from "../context/user";
import { useContext } from "react";


function PlayerCard({ inventory }) {
    const {user} = useContext(UserContext);
    const weaponArray = inventory.filter((inventory_item) => {
        if(inventory_item.equipped && inventory_item.id === user.equipped_weapon){
            return inventory_item
        } else return null
    })
    const weapon = weaponArray[0]
    if(weapon){
        console.log(weapon.item.name)
    }
    
    return (
        <div className="border-black border-solid border-2 m-1">
            <p>User: {user.username}</p>
            <p>Health: {user.current_health}/{user.max_health}</p>
            <p>Equiped Weapon: {weapon ? weapon.item.name : "none"}</p>
        </div>
    )
}

export default PlayerCard