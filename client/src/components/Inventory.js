import InventoryItemCard from "./InventoryItemCard"
import { useEffect, useState } from 'react';


function Inventory ({ inventory, setInventory }) {

    const [popup, setPopup] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setPopup(false)
        }, 3000)
    },[popup])

    const inventoryToDisplay = inventory.map((inventory_item, index) => <InventoryItemCard key={inventory_item.id} inventory_item={inventory_item} item={inventory_item.item} inventory={inventory} setInventory={setInventory} index={index} setPopup={setPopup}/>)

    return (
        <div className='overflow-auto min-h-screen font-display text-center'>
            {/* <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button> */}
            <p className='text-lg'>Your Inventory:</p>
            <p className="fixed p-16">{popup ? "An item is already equipped": null}</p>
            {inventoryToDisplay}
            <p className='m-6'>Complete goals to get more items.</p>
        </div>
    )
}


export default Inventory