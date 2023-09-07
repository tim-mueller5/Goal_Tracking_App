import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
 

function CreateGoal({ user, setGoal }) {


    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/home')
    }

    const formShema = yup.object().shape({
        name: yup.string().required("Must have name"),
        details: yup.string(),
        user_id: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            details: "",
            user_id: ""
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            values.user_id = user.id
            fetch("/goals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.ok) {
                    resp = resp.json().then((goal) => setGoal(goal))
                }
            }).then(() => {
                // navigate('/home')
                window.location.reload(true)
            }).catch(() => console.log("Caught Errot in fetch!"))
        }
    })



    return (
        <div>
            <h2>CreateGoal Component</h2>
            <button onClick={goHome}>Home</button>
            <form onSubmit={formik.handleSubmit}>
                <h3>Create New Goal Form:</h3>
                <label htmlFor="name">Goal: </label>
                <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                <label htmlFor='details'>Details: </label>
                <input id='details' name='details' onChange={formik.handleChange} value={formik.values.details}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateGoal;