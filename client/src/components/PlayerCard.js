import { UserContext } from "../context/user";
import { useContext } from "react";


function PlayerCard({ inventory }) {
    const {user} = useContext(UserContext);
    const weaponArray = inventory.filter((inventory_item) => {
        if(inventory_item.item.type === 'weapon' && inventory_item.equipped && inventory_item.id === user.equipped_weapon){
            return inventory_item
        } else return null
    })
    const weapon = weaponArray[0]

    // const magicArray = inventory.filter((inventory_item) => {
    //     if(inventory_item.item.type === 'magic' && inventory_item.equipped && inventory_item.id === user.equipped_weapon){
    //         return inventory_item
    //     } else return null
    // })
    // const magic = magicArray[0]
    
    return (
        <div className="font-display grid grid-cols-custom grid-rows-1">
            <div className="m-auto w-min relative">
                <div id="triangle-up" className="relative ">
                    <div id="triangle-up-2" className="relative top-4 right-5"></div>
                    <div id='rectangle' className='relative right-5 top-4'></div>
                </div>
                <div id="triangle-down" className="relative">
                    <div id="triangle-down-2" className="relative bottom-16 right-5"></div>
                </div>
                {/* <div id="animation-1" className="absolute top-1 animate-flash">
                    <div id="rectangle-top" className=""></div>
                    <div id="rectangle-right" className=""></div>
                    <div id="rectangle-bottom" className=""></div>
                    <div id="rectangle-left" className=" relative bottom-6 right-5"></div>
                </div> */}
            </div>

            <div className="w-max">
                <p>User: {user.username}</p>
                <p>Health: {user.current_health}/{user.max_health}</p>
                <p>Level: {user.level} &emsp; xp: {user.xp}</p>
                <p>Equipped Weapon: {weapon ? weapon.item.name : "none"}</p>
                <p>Equipped Magic: none</p>
                {/* <p>Equipped Magic: {magic ? magic.item.name : "none"}</p> */}
                <p>Equipped Armor: none</p>
            </div>

            <div className="m-auto w-min">
                <div id="triangle-up" className="relative">
                    <div id="triangle-up-2" className="relative top-4 right-5"></div>
                    <div id='rectangle' className='relative right-5 top-4'></div>
                </div>
                <div id="triangle-down" className="relative">
                    <div id="triangle-down-2" className="relative bottom-16 right-5"></div>
                </div>
            </div>

        </div>
    )
}

export default PlayerCard