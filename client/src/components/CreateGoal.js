import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
 

function CreateGoal({ user, setUser }) {

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
            // console.log(values.due_date)
            values.due_date = new Date(values.due_date).toLocaleDateString();
            // console.log(values.due_date)
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
        <div>
            <h2>CreateGoal Component</h2>
            <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button>
            <form onSubmit={formik.handleSubmit}>
                <h3>Create New Goal Form:</h3>
                <label htmlFor="name">Goal: </label>
                <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                <label htmlFor='details'>Details: </label>
                <input id='details' name='details' onChange={formik.handleChange} value={formik.values.details}/>
                <label htmlFor='due_date'>Due Date: </label>
                <input id='due_date' name='due_date' type='date' onChange={formik.handleChange} value={formik.values.due_date}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateGoal;