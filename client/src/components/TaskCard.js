import { useNavigate } from "react-router-dom";

function TaskCard({ task, goal, user, setUser, currentGoal, setCurrentGoal }) {

    const navigate = useNavigate();

    const edit = () => {
        setCurrentGoal(goal)
        navigate(`/edit-task/${task.id}/${task.name}`)
    }

    const handleDelete = () => {
        fetch(`/tasks/${task.id}`, {
            method: "DELETE",
        }).then((resp) => {
            if(resp.ok){
                const newTasks = goal.tasks.filter((thisTask) => {
                    if(thisTask.id !== task.id){
                        return thisTask
                    }else{return null}
                })
                const newGoal = {...goal, tasks:newTasks}
                const newGoals = user.goals.map((thisGoal) => {
                    if(thisGoal.id === goal.id){
                        return newGoal
                    } else{
                        return thisGoal
                    }
                })
                setUser({...user, goals:newGoals})
            }
        })
    }

    const handleCompelete = () => {
        setCurrentGoal(goal)
        fetch(`/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({completed: true}),
        }).then((resp) => {
            if (resp.ok) {
                resp = resp.json().then((newTask) => {
                    const tasks = goal.tasks.map((task) => {
                        if(task.id === newTask.id){
                            return newTask
                        }else{
                            return task
                        }
                    })
                    const goals = user.goals.map((goal) => {
                        if(goal.id === currentGoal.id){
                            return {...currentGoal, tasks:tasks}
                        }else{
                            return goal
                        }
                    })
                    setUser({...user, goals:goals})
                })
            }
        }).then(() => {
            // navigate('/')
        }).catch(() => console.log("Caught Error in fetch!"))
    }

    return (
        <div  className="border-solid border-black border-2 m-2 p-1">
            <h4>Task: {task.name}</h4>
            { task.completed ?
                <p>Completed!</p> 
                :   <div>
                        <button onClick={edit} className='border-solid border-black border-2 px-1'>Edit Task</button>
                        <button onClick={handleDelete} className='border-solid border-black border-2 px-1'>Delete Task</button>
                        <button onClick={handleCompelete}className='border-solid border-black border-2 px-1'>Mark as Complete</button>
                    </div>}
        </div>
    )
}

export default TaskCard;