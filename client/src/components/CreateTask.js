import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function CreateTask({ goal }) {

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
            fetch("/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then(() => {
                // navigate('/home')
                window.location.reload(true)
            }).catch((e) => console.log(e))
        }
    })

    const goHome = ()=> {
        navigate('/home')
    }

    return (
        <div>
            <h3>CreateTask Component</h3>
            <button onClick={goHome}>Home</button>
            <form onSubmit={formik.handleSubmit}>
                <h3>Create New Task Form:</h3>
                <label htmlFor="name">Task: </label>
                <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTask;