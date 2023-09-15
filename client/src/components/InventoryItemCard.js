import { UserContext } from "../context/user";
import { useContext } from "react";

function InventoryItemCard({ inventory_item, item, inventory, setInventory }) {

    const {user, setUser} = useContext(UserContext);

    function useHealthPotion() {
        let newHealth
        if(user.current_health + item.health_stat <= user.max_health){
            newHealth = user.current_health + item.health_stat
        } else if(user.current_health + item.health_stat > user.max_health){
            newHealth = user.max_health
        }

        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({current_health: newHealth})
        })
        setUser({...user, current_health: newHealth})

        fetch(`/inventoryitems/${inventory_item.id}`, {
            method: 'DELETE',
        })
        inventory.splice(inventory_item.id-1, 1)
        setInventory([...inventory])
    }

    function handleDelete() {
        fetch(`/inventoryitems/${inventory_item.id}`, {
            method: 'DELETE',
        })
        inventory.splice(inventory_item.id-1, 1)
        setInventory([...inventory])
    }

    return (
        <div>
            <p>Item Card: {item.name}</p>
            {item.type === 'health' ? <button onClick={useHealthPotion} className='border-solid border-black border-2 px-1'>Use {item.name}</button> 
            : <button onClick={handleDelete} className='border-solid border-black border-2 px-1'>Delete {item.name}</button>}
        </div>
    )
}

export default InventoryItemCard