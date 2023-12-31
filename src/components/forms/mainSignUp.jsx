import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './signup';

class MainSignUp extends Component {

    showLogin = () => {
        window.location = '/login'
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <li className='nav'>
                        <ul className='navItem1' >
                            <Link className='navItem1' to='/explore'> Phantom Screen</Link>
                        </ul>
                    </li>
                </nav>
                <div className='formBox'>
                    <p className='formIntro'>
                        "Welcome to <span style={{ color: "#902923" }}> Phantom Screens</span> ,
                        where reality fades and dreams take shape,
                        for in this realm,
                        every ticket is an invitation to a magical cinematic escape."
                    </p>
                    <p className='ps'>
                        - Unknown movie character.</p>
                    <SignUp showLogin={this.showLogin} />
                </div>
            </React.Fragment>
        );
    }
}

export default MainSignUp;