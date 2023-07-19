import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { createUser } from '../../services/userservice';
import { readUser } from '../../services/authservice';

const SignUp = (props) => {
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: ''
    });

    const schema = {
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .label('email'),

        username: Joi.string()
            .required()
            .alphanum()
            .min(5)
            .max(15)
            .label('username'),

        password: Joi.string()
            .required()
            .min(8)
            .max(16)
            .label('password')
    };

    const handleError = (user) => {
        const resultEmail = schema.email.validate(user.email);

        if (resultEmail.error) {
            alert(resultEmail.error);
            return resultEmail.error;
        }

        const resultUsername = schema.username.validate(user.username);

        if (resultUsername.error) {
            alert(resultUsername.error);
            return resultUsername.error;
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

        const newUser = await createUser(user);
        console.log('submitted');

        if (newUser) {
            console.log(newUser);
            const logged = await readUser(user);
            if (logged) {
                console.log('logged in');
                window.location = '/explore';
            }
        }
    };

    const handleChange = (e) => {
        const { placeholder, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [placeholder.toLowerCase()]: value
        }));
    };

    return (
        <div className='form'>
            <input
                className='formInput'
                placeholder='Email'
                onChange={handleChange}
                type='email'
            />

            <input
                className='formInput'
                placeholder='Username'
                onChange={handleChange}
                type='text'
            />

            <input
                className='formInput'
                placeholder='Password'
                onChange={handleChange}
                type='password'
            />

            <Link onClick={props.showLogin} className='loginLink'>
                already a member?
            </Link>
            <button onClick={submit} className='signupButton'>
                Join
            </button>
        </div>
    );
};

export default SignUp;

