import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

function Login( { user, setUser }) {

    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string().required("Must have username"),
        password: yup.string().required("Must have password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                    formik.values.username = ""
                    formik.values.password = ""
                    navigate(`/home`)
                  }
            })
        }
    })


    return (
        <div>
            <div className='flex-c text-center'>
                <h2>Login:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">username: </label>
                    <input id="username" name="username" onChange={formik.handleChange} value={formik.values.username} 
                        style={{background: '#70a7ff'}}/>
                    <p style={{ color: "red" }}> {formik.errors.username}</p>
                    <label className='flex-sb' htmlFor="password">password:&nbsp;&nbsp;</label>
                    <input id="password" name="password" onChange={formik.handleChange} value={formik.values.password}
                        style={{background: '#70a7ff'}}/>
                    <p style={{ color: "red" }}> {formik.errors.password}</p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;