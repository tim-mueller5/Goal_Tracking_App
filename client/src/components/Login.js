import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { UserContext } from "../context/user";
import { useContext } from "react";

function Login( ) {

    const { setUser} = useContext(UserContext);

    const navigate = useNavigate();
    const [error, setError] = useState(null)

    const formSchema = yup.object().shape({
        username: yup.string().required("Must have username"),
        password: yup.string().required("Must have password"),
    })

    const formikLogin = useFormik({
        initialValues: {
            username: "",
            password: "",
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
                    setError(null)
                    navigate(`/`)
                  }
            })
        }
    })

    const newformSchema = yup.object().shape({
        username: yup.string().required("Must have username"),
        password: yup.string().required("Must have password"),
        max_health: yup.number(),
        current_health: yup.number(),
        base_atk_stat: yup.number(),
        base_def_stat: yup.number(),
        base_magic_stat: yup.number()
    })

    const formikNew = useFormik({
        initialValues: {
            username: "",
            password: "",
            max_health: 15,
            current_health: 15,
            base_atk_stat:1,
            base_def_stat:1,
            base_magic_stat:0
        },
        validationSchema: newformSchema,
        onSubmit: (values) => {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                
                if (resp.ok) {
                    fetch("/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    }).then((response) => {
                        if (response.ok) {
                            response.json().then((user) => setUser(user));
                          }
                    })
                }else{
                    resp.json().then((e) => {
                        setError(e.error)
                    })
                }
            }).catch((e) => {
                setError(e)
            });
        }
    })


    return (

        <div className='flex-c text-center overflow-auto min-h-screen'>
            <h2 className="text-lg font-bold">Login:</h2>
            <form onSubmit={formikLogin.handleSubmit}>
                <label htmlFor="username">username: </label>
                <input id="username" name="username" onChange={formikLogin.handleChange} value={formikLogin.values.username} className="bg-sky-300 p-1 m-1 border-solid border-black border-2"/>
                <p style={{ color: "red" }}> {formikLogin.errors.username}</p>
                <label className='flex-sb' htmlFor="password">password:&nbsp;&nbsp;</label>
                <input id="password" name="password" onChange={formikLogin.handleChange} value={formikLogin.values.password} className="bg-sky-300 p-1 m-1 border-solid border-black border-2"/>
                <p style={{ color: "red" }}> {formikLogin.errors.password}</p>
                <button type="submit" className='border-solid border-black border-2 px-1 m-1'>Login</button>
            </form>
            <h2 className="text-lg font-bold">Or Create New User</h2>
            <form onSubmit={formikNew.handleSubmit}>
                <label htmlFor="username">username: </label>
                <input id="username" name="username" onChange={formikNew.handleChange} value={formikNew.values.username} className="bg-sky-300 p-1 m-1 border-solid border-black border-2"/>
                <p style={{ color: "red" }}> {formikNew.errors.username}</p>
                <label className='flex-sb' htmlFor="password">password:&nbsp;&nbsp;</label>
                <input id="password" name="password" onChange={formikNew.handleChange} value={formikNew.values.password} className="bg-sky-300 p-1 m-1 border-solid border-black border-2"/>
                <p style={{ color: "red" }}> {formikNew.errors.password}</p>
                <button type="submit" className='border-solid border-black border-2 px-1 m-1'>Create New User</button>
            </form>
            <p>{error}</p>
        </div>


    )
}

export default Login;