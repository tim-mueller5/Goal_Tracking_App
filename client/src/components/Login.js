import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

function Login( { setUser } ) {

    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string().required("Must have username"),
        password: yup.string().required("Must have password")
    })

    const formikLogin = useFormik({
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
                    navigate(`/home`)
                  }
            })
        }
    })

    const formikNew = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                    navigate(`/home`)
                  }
            })
        }
    })


    return (

        <div className='flex-c text-center'>
            <h2>Login:</h2>
            <form onSubmit={formikLogin.handleSubmit}>
                <label htmlFor="username">username: </label>
                <input id="username" name="username" onChange={formikLogin.handleChange} value={formikLogin.values.username} 
                    style={{background: '#70a7ff'}}/>
                <p style={{ color: "red" }}> {formikLogin.errors.username}</p>
                <label className='flex-sb' htmlFor="password">password:&nbsp;&nbsp;</label>
                <input id="password" name="password" onChange={formikLogin.handleChange} value={formikLogin.values.password}
                    style={{background: '#70a7ff'}}/>
                <p style={{ color: "red" }}> {formikLogin.errors.password}</p>
                <button type="submit">Login</button>
            </form>
            <h2>Or Create New User</h2>
            <form onSubmit={formikNew.handleSubmit}>
                <label htmlFor="username">username: </label>
                <input id="username" name="username" onChange={formikNew.handleChange} value={formikNew.values.username} 
                    style={{background: '#70a7ff'}}/>
                <p style={{ color: "red" }}> {formikNew.errors.username}</p>
                <label className='flex-sb' htmlFor="password">password:&nbsp;&nbsp;</label>
                <input id="password" name="password" onChange={formikNew.handleChange} value={formikNew.values.password}
                    style={{background: '#70a7ff'}}/>
                <p style={{ color: "red" }}> {formikNew.errors.password}</p>
                <button type="submit">Create New User</button>
            </form>
        </div>


    )
}

export default Login;