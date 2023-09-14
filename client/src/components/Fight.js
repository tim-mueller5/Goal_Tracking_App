import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Fight({ user, setUser }) {

    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }
    
    const playerDamage = 5
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
            setMonster(monsters[0])
            setMonsterHealth(monsters[0].health)
            setMessages({
                monsterTurn: `${monsters[0].name} attacked for ${monsters[0].atk_stat}`,
                playerTurn: `You dealt ${playerDamage} to the ${monsters[0].name}`,
                death: "Your have been defeated!  Complete goals to earn health potions.",
                victory: `You have defeated the ${monsters[0].name}`
            })
            setCurrentMessage(`You have found a ${monsters[0].name}!`)
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
    }

    return (
        <div>
            <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button>
            <p className='text-lg font-bold'>Fight Page</p>
            <p>Your Health: {playerHealth} hp</p>
            <p>Monster Health: {monsterHealth}</p>
            <p>{currentMessage}</p>
            <button onClick={nextAction} className='border-solid border-black border-2 px-1 block'>{playerTurn === true ? "Attack" : "Next"}</button>
        </div>
    )
}

export default Fight;