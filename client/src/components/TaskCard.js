import { useNavigate } from "react-router-dom";

function TaskCard({ task, goal, user, setUser, setCurrentGoal }) {

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

    return (
        <div  className="border-solid border-black border-2 m-2 p-1 inline-block">
            <h4>Task: {task.name}</h4>
            <button onClick={edit} className='border-solid border-black border-2 px-1'>Edit Task</button>
            <button onClick={handleDelete} className='border-solid border-black border-2 px-1'>Delete Task</button>
        </div>
    )
}

export default TaskCard;