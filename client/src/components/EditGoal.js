import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function EditGoal({ currentGoal }) {

    const {user, setUser} = useContext(UserContext);
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
            name: currentGoal ? currentGoal.name : "",
            details: currentGoal ? currentGoal.details : "",
            due_date: currentGoal.due_date ? currentGoal.due_date : "",
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            values.due_date = new Date(values.due_date).toLocaleDateString();
            fetch(`/goals/${currentGoal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.ok) {
                    resp = resp.json().then((newGoal) => {
                        const goals = user.goals.map((goal) => {
                            if(goal.id === currentGoal.id){
                                return newGoal
                            }else{
                                return goal
                            }
                        })
                        setUser({...user, goals:goals})
                    })
                }
            })
            .then(() => {
                navigate('/')
            }).catch(() => console.log("Caught Error in fetch!"))
        }
    })

    if(currentGoal) {

        return(
            <div>
                <h3>Edit Goal Component</h3>
                <p>{currentGoal.name}</p>
                <button onClick={goHome}>Home</button>
                <form onSubmit={formik.handleSubmit}>
                    <h3>Edit Goal Form:</h3>
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
    
}

export default EditGoal;