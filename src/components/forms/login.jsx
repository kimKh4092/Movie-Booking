import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { readUser } from '../../services/authservice';

const Login = ({ showSignUp }) => {
    const [user, setUserState] = useState({
        email: '',
        password: ''
    });

    const schema = {
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .label('email'),
        password: Joi.string()
            .min(8)
            .max(16)
            .required()
            .label('password')
    };

    const handleError = (user) => {
        const resultEmail = schema.email.validate(user.email);

        if (resultEmail.error) {
            alert(resultEmail.error);
            return resultEmail.error;
        }

        const resultPassword = schema.password.validate(user.password);

        if (resultPassword.error) {
            alert(resultPassword.error);
            return resultPassword.error;
        }
    };

    const submit = async () => {
        if (handleError(user)) {
            return;
        }

        const userData = await readUser(user);
        console.log('logged in');
        window.location = '/explore'
    };

    const handleChange = (e) => {
        const { placeholder, value } = e.target;
        setUserState((prevState) => ({
            ...prevState,
            [placeholder.toLowerCase()]: value
        }));
    };

    return (
        <div className='form'>
            <input
                className='formInput'
                placeholder='Email'
                value={user.email}
                onChange={handleChange}
                type='email'
            />
            <input
                className='formInput'
                placeholder='Password'
                onChange={handleChange}
                type='password'
            />

            <Link onClick={showSignUp} className='loginLink' value={user.password}>
                not a member yet?
            </Link>

            <button onClick={submit} className='signupButton'>
                Login
            </button>
        </div>

    );
};

export default Login;
