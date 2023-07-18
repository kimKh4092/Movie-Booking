import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { createUser } from '../../services/userservice';
import { readUser } from '../../services/authservice';

class SignUp extends Component {
    state = {
        user: {
            email: '',
            username: '',
            password: ''
        }
    }

    schema = {
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
    }

    handleError = (user) => {
        const resultEmail = this.schema.email.validate(user.email);

        if (resultEmail.error) {
            alert(resultEmail.error)
            return resultEmail.error
        }

        const resultUsername = this.schema.username.validate(user.username);

        if (resultUsername.error) {
            alert(resultUsername.error)
            return resultUsername.error
        }

        const resultPassword = this.schema.password.validate(user.password)

        if (resultPassword.error) {
            alert(resultPassword.error)
            return resultPassword.error
        }
    }

    submit = async () => {
        if (this.handleError(this.state.user)) {
            return
        }

        const newUser = await createUser(this.state.user);
        console.log('submitted');

        if (newUser) {
            console.log(newUser)
            const logged = await readUser(this.state.user);
            if (logged) {

                console.log('logged in');
                window.location = '/explore';
            }

        }
    }
    handleChange = (e) => {
        const user = this.state.user;
        user[e.target.placeholder.toLowerCase()] = e.target.value;
        this.setState(user)
    }

    render() {
        return (
            <div className='form'>
                <input className='formInput'
                    placeholder='Email'
                    onChange={this.handleChange}
                    type='email' />


                <input className='formInput'
                    placeholder='Username'
                    onChange={this.handleChange}
                    type='text' />

                <input className='formInput'
                    placeholder='Password'
                    onChange={this.handleChange}
                    type='password' />

                <Link onClick={this.props.showLogin} className='loginLink'>already a member?</Link>
                <button onClick={this.submit} className='signupButton'>Join</button>
            </div>
        );
    }
}

export default SignUp;