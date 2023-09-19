import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/user";
import { useContext } from "react";


function Fight({ inventory, setNavDisplay }) {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        setNavDisplay('hidden')
    }, [])
    
    const weaponArray = inventory.filter((inventory_item) => {
        if(inventory_item.equipped && inventory_item.id === user.equipped_weapon){
            return inventory_item
        } else return null
    })
    const weapon = weaponArray[0]
    let playerDamage
    if(weapon){
        playerDamage = (user.base_atk_stat + weapon.item.atk_stat)
    }else (
        playerDamage = user.base_atk_stat
        )
        
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
        if (playerHealth > 0 && monsterHealth > 0) {
            if (playerTurn === true) {
                setMonsterHealth(monsterHealth - playerDamage)
                setCurrentMessage(messages.playerTurn)
                setPlayerTurn(!playerTurn)
        } else if (playerTurn === false) {
            setPlayerHealth(playerHealth - monster.atk_stat)
            setCurrentMessage(messages.monsterTurn)
            setPlayerTurn(!playerTurn)
        }
        } else if (playerHealth <= 0) {
            setCurrentMessage(messages.defeat)
            setPlayerTurn(true)
        } else if (monsterHealth <= 0) {
            setCurrentMessage(messages.victory)
            setMonsterPresent(false)
            setPlayerTurn(true)
        } else {
            setCurrentMessage("else")
        }
        setUser({...user, current_health: playerHealth})
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({current_health: playerHealth})
        })
    }
    
    const flee = async ()=> {
        const num = Math.floor(Math.random()*2 )
        if (monsterPresent && (num === 1)){
            setPlayerHealth(playerHealth - monster.atk_stat)
            setCurrentMessage(messages.runAway)
            setMonster(false)
            await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            setUser({...user, current_health: (playerHealth - monster.atk_stat)})
            console.log("after set")
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
            <p className='text-lg font-bold'>Fight!</p>
            <p>Your Health: {playerHealth} hp</p>
            <p>Equiped Weapon: {weapon ? weapon.item.name : "none"}</p> 
            {/* <p>Monster Health: {monsterHealth < 0 ? 0 : monsterHealth}</p> */}
            <p>{currentMessage}</p>
            {monsterPresent 
            ? <button onClick={nextAction} className='border-solid border-black border-2 px-1 m-1'>{playerTurn === true ? "Attack" : "Next"}</button>
            : <button onClick={findAMonster} className='border-solid border-black border-2 px-1 m-1'>Find a Monster to fight!</button>}
            <button onClick={flee} className='border-solid border-black border-2 px-1 m-1'>{monsterPresent ? "Flee" : "Leave"}</button>
            
        </div>
    )
}

export default Fight;