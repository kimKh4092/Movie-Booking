import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        user: {
            email: '',
            password: ''
        }
    }

    submit = () => {
        console.log('logged in')
        console.log(this.state.user)
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
                    value={this.state.user.email}
                    onChange={this.handleChange} />
                <input className='formInput'
                    placeholder='Password'
                    onChange={this.handleChange} />

                <Link onClick={this.props.showSignUp}
                    className='loginLink'
                    value={this.state.user.password}>not a member yet?</Link>

                <button onClick={this.submit}
                    className='signupButton'>Login</button>
            </div>
        );
    }
}

export default Login;