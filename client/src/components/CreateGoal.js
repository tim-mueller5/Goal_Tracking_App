import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function CreateGoal() {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

    
    const formShema = yup.object().shape({
        name: yup.string().required("Must have name"),
        details: yup.string(),
        user_id: yup.string(),
        due_date: yup.date(),
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            details: "",
            user_id: "",
            due_date: ""
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            values.due_date = new Date(values.due_date).toLocaleDateString();
            values.user_id = user.id
            fetch("/goals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.ok) {
                    resp = resp.json().then((goal) => {
                        const goals = [...user.goals, goal]
                        setUser({...user, goals:goals})
                    })
                }else {
                    resp = resp.json().then((err) => console.log(err))
                }
                
                
            }).then(() => {
                navigate('/')
            }).catch(() => console.log("Caught Error in fetch!"))
        }
    })



    return (
        <div className='overflow-auto min-h-screen'>
            {/* <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button> */}
            <form onSubmit={formik.handleSubmit}>
                <h3>Create New Goal:</h3>
                <label htmlFor="name">Goal: </label>
                <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name} className="bg-sky-300 p-1 m-1 border-solid border-black border-2"/>
                <label htmlFor='details'>Details: </label>
                <input id='details' name='details' onChange={formik.handleChange} value={formik.values.details} className="bg-sky-300 p-1 m-1 border-solid border-black border-2"/>
                <label htmlFor='due_date'>Due Date: </label>
                <input id='due_date' name='due_date' type='date' onChange={formik.handleChange} value={formik.values.due_date} className="bg-sky-300 p-1 m-1 border-solid border-black border-2"/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateGoal;