import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function CreateGoal() {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    
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
        <div className='overflow-auto min-h-screen font-display grid justify-center'>
            <form onSubmit={formik.handleSubmit}>
                <h3 className='text-lg font-bold py-4'>Create New Goal:</h3>
                <label htmlFor="name">Goal: </label>
                <input id='name' name='name' autoFocus onChange={formik.handleChange} value={formik.values.name} className="bg-white p-1 m-1 rounded-full shadow-inner shadow-black"/>
                <br/>
                <label htmlFor='details'>Details: </label>
                <input id='details' name='details' onChange={formik.handleChange} value={formik.values.details} className="bg-white p-1 m-1 rounded-full shadow-inner shadow-black"/>
                <p className='inline-block'>&#40;optional&#41;</p>
                <br/>
                <label htmlFor='due_date'>Due Date: </label>
                <input id='due_date' name='due_date' type='date' onChange={formik.handleChange} value={formik.values.due_date} className="bg-white p-1 m-1 rounded-full shadow-inner shadow-black"/>
                <p className='inline-block'>&#40;optional&#41;</p>
                <br></br>
                <button type='submit' className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Submit</button>
            </form>
        </div>
    )
}

export default CreateGoal;