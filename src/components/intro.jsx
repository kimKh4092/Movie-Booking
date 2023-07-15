import React, { Component } from 'react';
import introPic1 from '../images/space_odyssey.jpg';
import introPic2 from '../images/dfs.jpg';
import '../styles/intro.css'
import { Link } from 'react-router-dom';

function Intro() {

    function handleClick1() {
        window.location = '/explore';


    }

    return (
        <React.Fragment>
            <div className='intro'>

                <div className='introContent1'>
                    <img src={introPic1} className='introPic1' />
                    <img src={introPic2} className='introPic2' />
                    <p className='title'>Phantom Screen</p>
                </div>

                <div className='introContent2'>
                    <p className='introText'>Where every
                        <span style={{ color: "#902923" }}> frame </span>
                        tells a story and every screening is a captivating journey into the realm of
                        <span style={{ color: "#902923" }}>    imagination</span>.
                    </p>

                    <div className='buttons'>
                        <button className='explore' onClick={handleClick1} >
                            <Link to='/explore' className='exploreLink'>Explore</Link></button>
                        <button className='join'>

                            {/* sign up or sign in route */}
                            <Link to='/' className='joinLink'>Join</Link></button>
                    </div>
                </div>
            </div>

        </React.Fragment >
    );
}

export default Intro;



