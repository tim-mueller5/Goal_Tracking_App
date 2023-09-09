import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function CreateTask({ user, setUser, currentGoal, setCurrentGoal  }) {
    
    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }

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
                        setCurrentGoal({...currentGoal, tasks:tasks})
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