import React, { Component } from 'react';
import Login from './login';
import { Link } from 'react-router-dom';

class MainLogin extends Component {
    state = {}
    showSignUp = () => {
        window.location = '/signup'
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <li className='nav'>
                        <ul className='navItem1' >
                            <Link className='navItem1'
                                to='/explore'> Phantom Screen</Link>
                        </ul>

                    </li>
                </nav>
                <div className='formBox'>
                    <p className='formIntro'>"Like a familiar face returning to the spotlight,
                        you step back into the embrace of <span style={{ color: '#902923' }}> Phantom Screens</span>,
                        where memories replay and cinematic journeys resume"
                    </p>
                    <p className='ps'>- Unknown movie character.</p>
                    <Login setUser={this.props.setCurrentUser}
                        showSignUp={this.showSignUp} />
                </div>

            </React.Fragment>

        );
    }
}

export default MainLogin;