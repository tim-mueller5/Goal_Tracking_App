import { useNavigate } from 'react-router-dom';
import InventoryItemCard from "./InventoryItemCard"


function Inventory ({ user }) {

    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

    console.log(user)

    const inventory = user.inventory_items.map((inventory_item) => <InventoryItemCard key={inventory_item.id} item={inventory_item.item}/>)

    return (
        <div>
            <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button>
            Inventory Screen
            {inventory}
        </div>
    )
}


export default Inventory