import React, { Component } from 'react';
import SignUp from './signup';
import { Link } from 'react-router-dom';

class MainSignUp extends Component {
    state = {}


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
                    <p className='formIntro'>"Welcome to <span style={{ color: "#902923" }}> Phantom Screens</span> ,
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