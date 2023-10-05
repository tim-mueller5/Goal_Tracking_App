import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/user";
import { useContext } from "react";


function Fight({ inventory, setNavDisplay }) {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        setNavDisplay('hidden')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const weaponArray = inventory.filter((inventory_item) => {
        if(inventory_item.equipped && inventory_item.id === user.equipped_weapon){
            return inventory_item
        } else return null
    })
    const weapon = weaponArray[0]
    const playerDamage = user.base_atk_stat

    const [monsterPresent, setMonsterPresent] = useState(false)
    const [monster, setMonster] = useState()
    const [monsterHealth, setMonsterHealth] = useState()
    const [playerHealth, setPlayerHealth] = useState(user.current_health)
    const [currentMessage, setCurrentMessage] = useState()
    const [playerTurn, setPlayerTurn] = useState(true)
    const [messages, setMessages] = useState({})

    const findAMonster = () => {
        fetch('/monsters')
        .then((resp) => resp.json())
        .then((monsters) => {
            const monster = monsters[Math.floor(Math.random() * monsters.length)]
            setMonster(monster)
            setMonsterPresent(true)
            setMonsterHealth(monster.health)
            setMessages({
                monsterTurn: `${monster.name} attacked for ${monster.atk_stat} damage`,
                playerTurn: `You dealt ${playerDamage} damage to the ${monster.name}`,
                death: "Your have been defeated!  Complete goals to earn health potions.",
                victory: `You have defeated the ${monster.name}`,
                runAway: `${monster.name} attacked for ${monster.atk_stat} damage before you got away`
            })
            setCurrentMessage(`You have found a ${monster.name}!`)
        })
    }
        
    const nextAction = () => {
        let xp = 0
        if (playerHealth > 0 && monsterHealth > 0) {
            if (playerTurn === true) {
                let damage
                if(weapon){
                   damage = user.base_atk_stat + Math.floor(Math.random() * user.base_atk_stat) + Math.floor(Math.random() * weapon.item.atk_stat)  
                } else {
                    damage = user.base_atk_stat + Math.floor(Math.random() * user.base_atk_stat)
                }
                console.log(playerDamage, damage)
                setMonsterHealth(monsterHealth - playerDamage - damage)
                setCurrentMessage(`You dealt ${playerDamage + damage} damage to the ${monster.name}`)
                setPlayerTurn(!playerTurn)
            } else if (playerTurn === false) {
                const damage = monster.atk_stat + Math.floor(Math.random() * monster.atk_stat)
                console.log(damage)
                if((playerHealth - damage) < 0){
                    setPlayerHealth(0)
                } else {
                    setPlayerHealth(playerHealth - damage)
                }
                setCurrentMessage(`${monster.name} attacked for ${damage} damage`)
                setPlayerTurn(!playerTurn)
            }
        } else if (playerHealth <= 0) {
            console.log("run?")
            setCurrentMessage(messages.death)
        } else if (monsterHealth <= 0) {
            setCurrentMessage(messages.victory)
            setMonsterPresent(false)
            xp = monster.xp
        } else {
            setCurrentMessage("else")
        }
        setUser({...user, current_health: playerHealth, xp:(user.xp + xp)})
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({current_health: playerHealth, xp:(user.xp + xp)})
        })
    }
    
    const flee = async ()=> {
        const num = Math.floor(Math.random()*2 )
        if (monsterPresent && (num === 1) && (playerHealth > 0)){
            setPlayerHealth(playerHealth - monster.atk_stat)
            setCurrentMessage(messages.runAway)
            setMonster(false)
            await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            setUser({...user, current_health: (playerHealth - monster.atk_stat)})
            fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({current_health: (playerHealth - monster.atk_stat)})
            }).then(() => {
                setNavDisplay('border-solid border-stone-300 border-8 mb-2 p-4 grid grid-cols-3 grid-rows-1 rounded-b-3xl font-display')
                navigate('/')
            })
        } else {
            console.log("You ran away!")
            setNavDisplay('border-solid border-stone-300 border-8 mb-2 p-4 grid grid-cols-3 grid-rows-1 rounded-b-3xl font-display')
            navigate('/')
        }
        
    }
    
    return (
        <div className='overflow-auto min-h-screen font-display text-center p-10'>
            <p className='text-xl font-bold my-4'>Fight!</p>
            <p>Your Health: {playerHealth} hp</p>
            <p>Equiped Weapon: {weapon ? weapon.item.name : "none"}</p> 
            {/* <p>Monster Health: {monsterHealth < 0 ? 0 : monsterHealth}</p> */}
            <p>{currentMessage}</p>
            <br/>
            {monsterPresent 
            ? <button onClick={nextAction} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>{playerTurn === true ? "Attack" : "Next"}</button>
            : <button onClick={findAMonster} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Find a Monster to fight!</button>}
            <button onClick={flee} className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>{monsterPresent ? "Flee" : "Leave"}</button>
            
        </div>
    )
}

export default Fight;