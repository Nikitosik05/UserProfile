import { Formik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { userSignUp } from '../../redux/action/userActions';

function SignUp() {
    const login = () => {
        navigate("/login");
    }
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const validation = Yup.object().shape({
        name: Yup.string().required('required').min(2, 'Min 2 symbols allowed'),
        surname: Yup.string().required('required').min(2, 'Min 2 symbols allowed'),
        email: Yup.string().required('required').email("It's not an email"),
        password: Yup.string().required('required').min(6, "min 6 symbols allowed"),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')


        // password confir dont work
    })
    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={validation}
            initialValues={{ name: '', surname: '', email: '', password: '', passwordConfirm: '' }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)

                const data = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    password: values.password
                }

                dispatch(userSignUp(data))
                setSubmitting(false)
                console.log(data);
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
                        placeholder="Name"
                        type={"text"}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && (<div>{errors.name}</div>)}

                    <input
                        placeholder="surname"
                        type={"text"}
                        name="surname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.surname}
                    />
                    {errors.surname && (<div>{errors.surname}</div>)}
                    <input
                        placeholder="email"
                        type={"text"}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && (<div>{errors.email}</div>)}
                    <input
                        placeholder="password"
                        type={"password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && (<div>{errors.password}</div>)}

                    <input
                        placeholder="passwordConfirm"
                        type={"password"}
                        name="passwordConfirm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirm}
                    />
                    {errors.passwordConfirm && (<div>{errors.passwordConfirm}</div>)}


                    <button disabled={isSubmitting}>SignUp</button>
                    <div>or</div>
                    <button onClick={() => login()}>Login</button>
                </form>
            )}

        </Formik>
    );
}

export default SignUp;