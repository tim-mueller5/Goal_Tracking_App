import { useNavigate } from 'react-router-dom';
import InventoryItemCard from "./InventoryItemCard"


function Inventory ({ inventory }) {

    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

    const inventoryToDisplay = inventory.map((inventory_item) => <InventoryItemCard key={inventory_item.id} item={inventory_item.item}/>)

    return (
        <div>
            <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button>
            Inventory Screen
            {inventoryToDisplay}
        </div>
    )
}


export default Inventory