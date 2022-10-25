import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from "react-redux"
import { userLogin } from '../../redux/action/userActions';


function Login() {
    const validation = Yup.object().shape({
        email: Yup.string().required('required').email("It's not an email"),
        password: Yup.string().required('required').max(15, "max 10 symbols allowed")
    })
    const dispatch = useDispatch()
    return (
        <Formik
        validateOnChange={false}
            validateOnBlur={false}
            validationSchema={validation}
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)

                const data = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    password: values.password
                }

                dispatch(userLogin(data))
                setSubmitting(false)
            }}
        >
             {({
                values,
                errors,
                handleSubmit,
                handleBlur,
                handleChange,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Email"
                        type={"text"}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} />
                    {errors.email && (<div>{errors.email}</div>)}
                    <input
                        placeholder="Password"
                        type={"password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password} />
                    {errors.password && (<div>{errors.password}</div>)}

                    <button disabled={isSubmitting}>Login</button>
                </form>
            )}

        </Formik>
        );
}
export default Login;