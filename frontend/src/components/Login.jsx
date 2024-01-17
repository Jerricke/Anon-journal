import { useFormik } from 'formik';
import { useNavigate, NavLink } from 'react-router-dom';
import * as yup from 'yup';

import './login_signup.css';

export default function Login({ onLogin }) {
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup
            .string()
            .max(16, 'Must be 16 characters or less')
            .required('Must enter a username'),
        password: yup
            .string()
            .max(20, 'Must be 20 characters or less')
            .required('Must enter a password'),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then((user) => onLogin(user));
                    navigate('../user/home');
                } else {
                    Error('invalid credentials');
                }
            });
        },
    });

    const { errors } = formik;
    const arrayErrors = Array.from(errors);

    return (
        <div className="login__container">
            <form className="login__form" onSubmit={formik.handleSubmit}>
                <label>What's your name?</label>
                <input
                    className="login__input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                <label>What's your secret code?</label>
                <input
                    className="login__password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {arrayErrors.map((error) => (
                    <h3 style={{ color: 'red' }} key={error}>
                        {error.toUpperCase}
                    </h3>
                ))}
                <input
                    className="login__button btn"
                    type="submit"
                    id="submit"
                    value="Login"
                />
                <NavLink to="/signup" className="login__signup">
                    Don't have an account yet? Signup here
                </NavLink>
            </form>
        </div>
    );
}
