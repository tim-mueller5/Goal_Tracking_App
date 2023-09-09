import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {

    const navigate = useNavigate();

    const edit = () => {

        navigate(`/edit-task/${task.id}/${task.name}`)
    }

    return (
        <div>
            <h4>TaskCard Component: {task.name}</h4>
            <button onClick={edit}>Edit Task</button>
        </div>
    )
}

export default TaskCard;