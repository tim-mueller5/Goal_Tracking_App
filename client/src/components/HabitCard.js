import { useNavigate } from "react-router-dom";

function HabitCard({ habit }) {

    const navigate = useNavigate();

    const edit = () => {
        navigate(`/edit-habit/${habit.id}/${habit.name}`)
    }

    return (
        <div>
            <h4>Habit Card Component: {habit.name}</h4>
            <button onClick={edit}>Edit Habit</button>
        </div>
    )
}

export default HabitCard;