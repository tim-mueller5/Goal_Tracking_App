import { useNavigate } from 'react-router-dom';
import InventoryItemCard from "./InventoryItemCard"


function Inventory ({ inventory, setInventory }) {

    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

    const inventoryToDisplay = inventory.map((inventory_item, index) => <InventoryItemCard key={inventory_item.id} inventory_item={inventory_item} item={inventory_item.item} inventory={inventory} setInventory={setInventory} index={index}/>)

    return (
        <div className='overflow-auto min-h-screen font-display text-center'>
            {/* <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button> */}
            <p className='text-lg'>Your Inventory:</p>
            {inventoryToDisplay}
            <p className='m-6'>Complete goals to get more items.</p>
        </div>
    )
}


export default Inventory