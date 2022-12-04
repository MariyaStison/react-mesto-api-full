import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const btnClassName = `btn btn_type_submit btn_color_white ${props.isLoading && "btn_inactive"}`;

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(email, password);
    }

    function handleChangeEmail(e) {
       setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="login__container">
            <h2 className="login__title">Регистрация</h2>
            <form
                name="login"
                className="popup__form"
                onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    id="email-input"
                    placeholder="Email"
                    name="email"
                    required
                    className="input input_type_name input_color_white"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChangeEmail} />
                <input
                    type="password"
                    value={password}
                    id="password-input"
                    placeholder="Пароль"
                    name="password"
                    className="input input_type_about input_color_white"
                    required
                    minLength="2"
                    maxLength="40"
                    onChange={handleChangePassword} />
                <input
                    type="submit"
                    value={props.isLoading ? props.submitLoadingText : props.submitText}
                    className={btnClassName} />
            </form>
            <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register;