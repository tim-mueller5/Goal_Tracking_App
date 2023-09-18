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

    const handleEquipWeapon = () => {
        const alreadyEquipped = inventory.filter((item) => {
            if (item.equipped) return item
        })
        if(alreadyEquipped.length === 0){
            fetch(`inventoryitems/${inventory_item.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({equipped: true})
            })
            inventory_item.equipped = true
            setInventory([...inventory])
            fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({equipped_weapon: inventory_item.id})
            })
            setUser({...user, equipped_weapon: inventory_item.id})
        } else console.log("An item is already equipped!")
    }

    const handleUnEquipWeapon = () => {
        fetch(`inventoryitems/${inventory_item.id}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({equipped: false})
        })
        inventory_item.equipped = false
        setInventory([...inventory])
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({equipped_weapon: null})
        })
        setUser({...user, equipped_weapon: null})
    }

    return (
        <div className="font-display m-2">
            <p className="text-lg">{item.name}</p>
            {item.type === 'health' ? <button onClick={useHealthPotion} className='border-solid border-black border-2 px-1 m-1'>Use {item.name}</button> 
            : <button onClick={handleDelete} className='border-solid border-black border-2 px-1 m-1'>Delete {item.name}</button>}
            {item.type === 'weapon' && !inventory_item.equipped ? <button onClick={handleEquipWeapon} className='border-solid border-black border-2 px-1 m-1'>Equip</button> 
            : null}
            {item.type === 'weapon' && inventory_item.equipped ? <button onClick={handleUnEquipWeapon} className='border-solid border-black border-2 px-1 m-1'>Unequip</button> 
            : null}
        </div>
    )
}

export default InventoryItemCard