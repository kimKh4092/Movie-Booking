import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    state = {
        user: {
            email: '',
            username: '',
            password: ''
        }
    }

    submit = () => {
        console.log('submitted')
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
                    onChange={this.handleChange} />


                <input className='formInput'
                    placeholder='Username'
                    onChange={this.handleChange} />

                <input className='formInput'
                    placeholder='Password'
                    onChange={this.handleChange} />
                <Link onClick={this.props.showLogin} className='loginLink'>already a member?</Link>
                <button onClick={this.submit} className='signupButton'>Join</button>
            </div>
        );
    }
}

export default SignUp;