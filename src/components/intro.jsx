import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/intro.css';
import '../styles/form.css'
import SignUp from './forms/signup';
import Login from './forms/login';
import introPic1 from '../images/space_odyssey.jpg';
import introPic2 from '../images/dfs.jpg';

function Intro() {
    function handleClick1() {
        window.location = '/explore';
    }

    function handleClick2() {
        showSignUp()
        const explore = document.getElementById('explore');
        explore.classList.replace('explore', 'hide');
        const join = document.getElementById('join');
        join.classList.replace('join', 'hide');
    }

    function showSignUp() {
        const signup = document.getElementById('signup');
        signup.classList.remove('hide');
        const login = document.getElementById('login');
        login.classList.add('hide');
    }

    function showLogin() {
        const login = document.getElementById('login');
        login.classList.remove('hide');

        const signup = document.getElementById('signup');
        signup.classList.add('hide');
    }

    function goback() {
        window.location = '/';

    }

    return (
        <React.Fragment>
            <div className='intro'>

                <div className='introContent1'>
                    <img src={introPic1} className='introPic1' />
                    <img src={introPic2} className='introPic2' />
                    <p onClick={goback} className='title' >Phantom Screen</p>
                </div>

                <div className='introContent2'>
                    <p className='introText'>Where every
                        <span style={{ color: "#902923" }}> frame </span>
                        tells a story and every screening is a captivating journey into the realm of
                        <span style={{ color: "#902923" }}>    imagination</span>.
                    </p>

                    <div className='hide'
                        id='signup'>
                        <SignUp showLogin={showLogin} />
                    </div>

                    <div className='hide'
                        id='login'>
                        <Login showSignUp={showSignUp} />
                    </div>

                    <div className='buttons'>
                        <button id='explore' className='explore' onClick={handleClick1} >
                            <Link to='/explore' className='exploreLink'>Explore</Link>
                        </button>

                        <button id='join' onClick={handleClick2} className='join'>
                            Join
                        </button>
                    </div>
                </div>
            </div>

        </React.Fragment >
    );
}

export default Intro;



