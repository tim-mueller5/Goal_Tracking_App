import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function EditHabit() {

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
                    console.log("hi")
                    resp = resp.json().then(() => {
                        navigate('/')
                    })
                }
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