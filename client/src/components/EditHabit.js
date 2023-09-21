import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function EditHabit({ currentGoal }) {

    const {user, setUser} = useContext(UserContext);
    let  { habitId, habitName } = useParams();
    const navigate = useNavigate();


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
        <div className='overflow-auto min-h-screen font-display'>
            <h3 className='text-lg font-bold'>Edit Habit: {habitName}</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name" className='text-lg'>Habit: </label>
                    <input id='name' name='name' autoFocus onChange={formik.handleChange} value={formik.values.name} className="bg-white p-1 m-1 rounded-full shadow-inner shadow-black"/>
                    <button type='submit' className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Submit</button>
                </form>
        </div>
    )
}

export default EditHabit;