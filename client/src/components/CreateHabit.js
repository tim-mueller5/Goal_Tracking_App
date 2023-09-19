import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext, useState } from "react";


function CreateHabit({ currentGoal }) {  
    
    
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const goHome = ()=> {
        navigate('/')
    }
    const [hidden, setHidden] = useState('hidden')
    
    const formShema = yup.object().shape({
        name: yup.string().required("Must have name"),
        goal_id: yup.string()
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            goal_id: "",
            start_date: new Date().toLocaleDateString(),
            end_date: new Date(currentGoal.due_date).toLocaleDateString()
        },
        validationSchema: formShema,
        onSubmit: (values) => {
            values.goal_id = currentGoal.id
            fetch("/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                resp = resp.json()
                .then(async (habit) => {
                    let checkins = []
                    let differenceInDays
                    const differenceInTime = new Date(habit.end_date).getTime() - new Date(habit.start_date).getTime()
                    differenceInDays = differenceInTime/ (1000 * 3600 * 24)
                    
                    for (let i = 0; i < differenceInDays; i++) {
                        const date = new Date(Date.now() + (parseInt(i) * 3600 * 1000 * 24)).toLocaleDateString()
                        fetch('/checkins', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({habit_id: habit.id, date: date})   
                        }).then((resp) => {
                            resp.json().then((checkin) => {
                                checkins.push(checkin)
                                
                            })
                        })
                    }
                    setHidden('')
                    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
                    habit.checkins = checkins
                    const habits = [...currentGoal.habits, habit]
                    const goals = user.goals.map((goal) => {
                        if (goal.id === currentGoal.id){
                            return {...currentGoal, habits:habits}
                        }
                        else{
                            return goal
                        }
                    })
                    setUser({...user, goals:goals})
                    navigate('/')
                })
            }).catch((e) => console.log(e))
        }
    })

    const loaderDesign = `inline-block border-solid border-gray-500 border-t-blue-300 border-4 rounded-full h-6 w-6 animate-spin mx-4 ${hidden}`

    return (
        <div className='p-2 overflow-auto min-h-screen font-display'>
            {/* <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button> */}
            <form onSubmit={formik.handleSubmit} className='py-2'>
                <h3 className='py-4'>Create New Habit Form:</h3>
                <label htmlFor="name">Habit: </label>
                <input id='name' name='name' autoFocus onChange={formik.handleChange} value={formik.values.name} className="bg-white p-1 m-1 rounded-full shadow-inner shadow-black"/>
                <button type='submit' className='border-solid border-black border-2 px-4 m-1 bg-blue-500 rounded-full shadow-lg shadow-gray-600 hover:rounded-full hover:bg-blue-700 hover:border-gray-50 hover:text-gray-50 hover:shadow-white hover:shadow-inner'>Submit</button>
                <div className={loaderDesign}></div>
            </form>
        </div>
    )
}

export default CreateHabit;