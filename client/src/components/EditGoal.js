import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function EditGoal({ goal, setGoal }) {
    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

    const formShema = yup.object().shape({
        name: yup.string(),
        details: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: goal ? goal.name: "",
            details: goal ? goal.details: ""
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            fetch(`/goals/${goal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.ok) {
                    resp = resp.json().then(() => {
                        navigate('/')
                    })
                }
            }).catch(() => console.log("Caught Error in fetch!"))
        }
    })

    if(goal) {

        return(
            <div>
                <h3>Edit Goal Component</h3>
                <p>{goal.name}</p>
                <button onClick={goHome}>Home</button>
                <form onSubmit={formik.handleSubmit}>
                    <h3>Edit Goal Form:</h3>
                    <label htmlFor="name">Goal: </label>
                    <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                    <label htmlFor='details'>Details: </label>
                    <input id='details' name='details' onChange={formik.handleChange} value={formik.values.details}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
    
}

export default EditGoal;