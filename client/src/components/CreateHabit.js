import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function CreateHabit({ goal }) {

    const navigate = useNavigate();

    const formShema = yup.object().shape({
        name: yup.string().required("Must have name"),
        goal_id: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            goal_id: ""
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            values.goal_id = goal.id
            fetch("/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then(() => {navigate('/home/create-goal/task')})
            .catch((e) => console.log(e))
        }
    })
    
    const goHome = ()=> {
        navigate('/home')
    }

    return (
        <div>
            <h2>CreateHabit Component</h2>
            <button onClick={goHome}>Home</button>
            <form onSubmit={formik.handleSubmit}>
                <h3>Create New Habit Form:</h3>
                <label htmlFor="name">Habit: </label>
                <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateHabit;