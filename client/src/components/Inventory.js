import { useNavigate } from 'react-router-dom';
import InventoryItemCard from "./InventoryItemCard"


function Inventory ({ inventory, setInventory }) {

    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

    const inventoryToDisplay = inventory.map((inventory_item) => <InventoryItemCard key={inventory_item.id} inventory_item={inventory_item} item={inventory_item.item} inventory={inventory} setInventory={setInventory}/>)

    return (
        <div className='overflow-auto min-h-screen font-display'>
            {/* <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button> */}
            <p>Your Inventory:</p>
            {inventoryToDisplay}
        </div>
    )
}


export default Inventory