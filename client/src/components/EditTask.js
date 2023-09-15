import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function EditTask({ currentGoal }) {

    const {user, setUser} = useContext(UserContext);
    let  { taskId, taskName } = useParams();
    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }


    const formShema = yup.object().shape({
        name: yup.string()
    })
    const formik = useFormik({
        initialValues: {
            name: taskName
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            fetch(`/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.ok) {
                    resp = resp.json().then((newTask) => {
                        const tasks = currentGoal.tasks.map((task) => {
                            if(task.id === newTask.id){
                                return newTask
                            }else{
                                return task
                            }
                        })
                        const goals = user.goals.map((goal) => {
                            if(goal.id === currentGoal.id){
                                return {...currentGoal, tasks:tasks}
                            }else{
                                return goal
                            }
                        })
                        setUser({...user, goals:goals})
                    })
                }
            }).then(() => {
                navigate('/')
            }).catch(() => console.log("Caught Error in fetch!"))
        }
    })

    return (
        <div>
            <h3>EditTask Component</h3>
            <p>{taskName}</p>
            <button onClick={goHome}>Home</button>
                <form onSubmit={formik.handleSubmit}>
                    <h3>Edit Task Form:</h3>
                    <label htmlFor="name">Task: </label>
                    <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                    <button type='submit'>Submit</button>
                </form>
        </div>
    )
}

export default EditTask;