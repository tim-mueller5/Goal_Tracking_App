import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {

    const navigate = useNavigate();

    const edit = () => {
        // setGoal(goal)
        navigate(`/home/edit-task/${task.id}/${task.name}`)
    }

    return (
        <div>
            <h4>TaskCard Component: {task.name}</h4>
            <button onClick={edit}>Edit Task</button>
        </div>
    )
}

export default TaskCard;