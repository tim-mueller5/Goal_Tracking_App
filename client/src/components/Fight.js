import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/user";
import { useContext } from "react";


function Fight({ inventory }) {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

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
    
    const [monster, setMonster] = useState()
    const [monsterHealth, setMonsterHealth] = useState()
    const [playerHealth, setPlayerHealth] = useState(user.current_health)
    const [currentMessage, setCurrentMessage] = useState()
    const [playerTurn, setPlayerTurn] = useState(true)
    const [messages, setMessages] = useState({})
    
    useEffect(() => {
        fetch('/monsters')
        .then((resp) => resp.json())
        .then((monsters) => {
            const monster = monsters[Math.floor(Math.random() * monsters.length)]
            console.log(Math.floor(Math.random() * monsters.length))
            setMonster(monster)
            setMonsterHealth(monster.health)
            setMessages({
                monsterTurn: `${monster.name} attacked for ${monster.atk_stat}`,
                playerTurn: `You dealt ${playerDamage} to the ${monster.name}`,
                death: "Your have been defeated!  Complete goals to earn health potions.",
                victory: `You have defeated the ${monster.name}`
            })
            setCurrentMessage(`You have found a ${monster.name}!`)
        })
    }, [])

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
        } else if (monsterHealth <= 0) {
            setCurrentMessage(messages.victory)
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

    return (
        <div className='overflow-auto min-h-screen font-display text-center'>
            <button onClick={goHome} className='border-solid border-black border-2 px-1 m-1'>Home</button>
            <p className='text-lg font-bold'>Fight!</p>
            <p>Your Health: {playerHealth} hp</p>
            <p>Equiped Weapon: {weapon ? weapon.item.name : "none"}</p> 
            <p>Monster Health: {monsterHealth < 0 ? 0 : monsterHealth}</p>
            <p>{currentMessage}</p>
            <button onClick={nextAction} className='border-solid border-black border-2 px-1 m-1'>{playerTurn === true ? "Attack" : "Next"}</button>
        </div>
    )
}

export default Fight;