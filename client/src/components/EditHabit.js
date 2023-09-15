import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function EditHabit({ currentGoal }) {

    const {user, setUser} = useContext(UserContext);
    let  { habitId, habitName } = useParams();
    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }


    const formShema = yup.object().shape({
        name: yup.string()
    })
    const formik = useFormik({
        initialValues: {
            name: habitName
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            fetch(`/habits/${habitId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.ok) {
                    resp = resp.json().then((newHabit) => {
                        const habits = currentGoal.habits.map((habit) => {
                            if(habit.id === newHabit.id){
                                return newHabit
                            }else{
                                return habit
                            }
                        })
                        const goals = user.goals.map((goal) => {
                            if(goal.id === currentGoal.id){
                                return {...currentGoal, habits:habits}
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
            <h3>EditHabit Component</h3>
            <p>{habitName}</p>
            <button onClick={goHome}>Home</button>
                <form onSubmit={formik.handleSubmit}>
                    <h3>Edit Habit Form:</h3>
                    <label htmlFor="name">Habit: </label>
                    <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                    <button type='submit'>Submit</button>
                </form>
        </div>
    )
}

export default EditHabit;