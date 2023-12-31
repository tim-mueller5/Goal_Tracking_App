import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function CreateTask({ currentGoal }) {
    
    const {user, setUser} = useContext(UserContext);
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
            values.goal_id = currentGoal.id
            fetch("/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if(resp.ok){
                    resp = resp.json().then((task) => {
                        const tasks = [...currentGoal.tasks, task]
                        const goals = user.goals.map((goal) => {
                            if (goal.id === currentGoal.id){
                                return {...currentGoal, tasks:tasks}
                            }
                            else{
                                return goal
                            }
                        })
                        setUser({...user, goals:goals})
                    })
                }
            }).then(() => {
                navigate('/')
            }).catch((e) => console.log(e))
        }
    })


    return (
        <div className='overflow-auto min-h-screen font-display grid justify-center'>
            <form onSubmit={formik.handleSubmit}>
                <h3 className='py-4 text-lg font-bold'>Create New Task:</h3>
                <label htmlFor="name">Task: </label>
                <input id='name' name='name' autoFocus onChange={formik.handleChange} value={formik.values.name} className="bg-white p-1 m-1 rounded-full shadow-inner shadow-black"/>
                <button type='submit' className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTask;