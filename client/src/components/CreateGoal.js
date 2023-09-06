import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import NavBar from './NavBar'  

function CreateGoal({ user, setUser }) {

    console.log(user)

    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/home')
    }

    const formShema = yup.object().shape({
        name: yup.string().required("Must have name"),
        details: yup.string(),
        user_id: yup.string().required("Must have user id")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            details: "",
            user_id: 1
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
            }).then(console.log("posted"))
            .then((data) => {
                console.log("responce: ", data)
                navigate('/home')
            })
        }
    })



    return (
        <div>
            <h2>CreateGoal Component</h2>
            <NavBar user={user} setUser={setUser}/>
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