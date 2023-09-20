import { UserContext } from "../context/user";
import { useContext } from "react";

function InventoryItemCard({ inventory_item, item, inventory, setInventory, index, setPopup }) {

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
        }).then(() => {
            handleDelete()
        }).then(() => {
            setUser({...user, current_health: newHealth})
        })
    }

    function handleDelete() {
        fetch(`/inventoryitems/${inventory_item.id}`, {
            method: 'DELETE',
        })
        inventory.splice(index, 1)
        setInventory([...inventory])
        setUser({...user, inventory_items: inventory})
    }

    const handleEquipItem = (itemType) => {
        const alreadyEquipped = inventory.filter((item) => {
            if (item.equipped ) return item
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
        } else {
            console.log("An item is already equipped!")
            setPopup(true)
        }
    }

    const handleUnEquipItem = () => {
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
        setPopup(false)
    }

    return (
        <div className="font-display m-2">
            <p className="text-lg">{item.name}</p>

            {item.type === 'health' 
            ? <button onClick={useHealthPotion} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Use {item.name}</button> 
            : <button onClick={handleDelete} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Delete {item.name}</button>}

            {item.type !== 'health' && !inventory_item.equipped 
            ? <button onClick={() => handleEquipItem(item.type)} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Equip</button> 
            : null}

            {item.type !== 'health' && inventory_item.equipped 
            ? <button onClick={handleUnEquipItem} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Unequip</button> 
            : null}
            
        </div>
    )
}

export default InventoryItemCard