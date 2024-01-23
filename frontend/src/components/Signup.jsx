import { useFormik } from 'formik';
import { useNavigate, NavLink } from 'react-router-dom';
import * as yup from 'yup';

export default function Signup({ onSignup }) {
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
                    res.json().then((user) => onSignup(user));
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
        <div>
            <div className="form__container" />
        </div>
    );
}
