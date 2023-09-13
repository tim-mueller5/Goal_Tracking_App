import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function CreateHabit({ user, setUser, currentGoal }) {  

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
                if(resp.ok) {
                    resp = resp.json()
                    .then(async (habit) => {
                        

                        let checkins = []
                        let differenceInDays
                        const startDate = new Date()
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
                                    // console.log(checkins)
                                })
                            })
                        }

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
                    })
                }
            }).then(() => {
                navigate('/')
            }).catch((e) => console.log(e))
        }
    })
    

    return (
        <div>
            <h2>CreateHabit Component</h2>
            <button onClick={goHome} className='border-solid border-black border-2 px-1'>Home</button>
            <form onSubmit={formik.handleSubmit}>
                <h3>Create New Habit Form:</h3>
                <label htmlFor="name">Habit: </label>
                <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateHabit;