import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { useContext } from "react";


function TaskCard({ task, goal, currentGoal, setCurrentGoal }) {

    const {user, setUser} = useContext(UserContext);
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
            body: JSON.stringify({completed: !task.completed}),
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
                    const goals = user.goals.map((thisGoal) => {
                        if(thisGoal.id === goal.id){
                            return {...goal, tasks:tasks}
                        }else{
                            return thisGoal
                        }
                    })
                    setUser({...user, goals:goals})
                })
            }
        }).catch(() => console.log("Caught Error in fetch!"))
    }

    return (
        <div  className=" mx-2 p-1 font-display">
            <h4 className="text-lg font-bold">Task: {task.name}</h4>
            { task.completed ?
                <div className="flex ">
                    <p>Completed!</p> 
                    <button onClick={handleCompelete}className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Undo complete</button>
                </div>
                :   <div>
                        <button onClick={edit} className='border-solid border-black border-2 text-sm px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Edit Task</button>
                        <button onClick={handleDelete} className='border-solid border-black border-2 text-sm px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Delete Task</button>
                        <button onClick={handleCompelete}className='border-solid border-black border-2 text-sm px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Mark as Complete</button>
                    </div>}
        </div>
    )
}

export default TaskCard;