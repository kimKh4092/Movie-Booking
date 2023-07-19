import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authservice';
import { months, week } from '../utils/dateData';
import { removeClicked1, addClicked1 } from '../utils/manageClass';
import Schedule from './home/schedule';

const Profile = () => {
    const [dateIndex, setDateIndex] = useState(null);

    const buttonClicked = (day, index) => {
        if (dateIndex !== null) {
            removeClicked1(dateIndex);
        }
        addClicked1(index);
        setDateIndex(index);
    };

    const logoutUser = () => {
        logout();
        window.location = '/'
    }

    return (
        <>
            <nav>
                <li className='nav'>
                    <ul className='navItem1'>
                        <Link className='navItem1' to='/explore'> Phantom Screen</Link>
                    </ul>
                    {!getCurrentUser() ? (
                        <ul className='navItem2'>
                            <Link to='/signup' className='joinUs'>Join us</Link>
                        </ul>
                    ) : (
                        <p className='navItem2'>{getCurrentUser()}</p>
                    )}
                </li>
            </nav>
            <div className='profile'>
                <h2 className='qoute'>"This house is so full of people it makes me sick"</h2>
                <h2 className='qoute'>- Home alone</h2>
                <h2 className='profileTitle'>
                    wellcome home <span style={{ color: '#902923' }}> {getCurrentUser()}</span>
                </h2>

                <div className='history'>
                    <h2 className='historyTitle'>history of tickets</h2>
                    <Schedule months={months}
                        week={week}
                        buttonClicked={buttonClicked} />
                </div>
                <button onClick={logoutUser}
                    className='purchase'>Logout</button>
            </div>
        </>
    );
};

export default Profile;
























// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { getCurrentUser } from '../services/authservice';
// import Schedule from './home/schedule'
// import { months, week } from '../utils/dateData';


// class Profile extends Component {
//     state = {}

//     buttonClicked = async (day, index) => {
//         setDate(day);

//         removeClicked1(dateIndex);
//         addClicked1(index);
//         setIndex(index);

//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <nav>
//                     <li className='nav'>
//                         <ul className='navItem1'>
//                             <Link className='navItem1' to='/explore'> Phantom Screen</Link>
//                         </ul>

//                         {!getCurrentUser() ? <ul className='navItem2'>
//                             <Link to='/signup' className='joinUs'>Join us</Link></ul> :
//                             <p className='navItem2'>{getCurrentUser()}</p>}
//                     </li>
//                 </nav>

//                 <h2 className='qoute'>"This house is so full of people it makes me sick"
//                 </h2>
//                 <h2 className='qoute'>
//                     - Home alone</h2>
//                 <h2 className='profileTitle'>
//                     wellcome home <span style={{ color: '#902923' }}> {getCurrentUser()}</span>
//                 </h2>

//                 <div className='history'>
//                     <h2 className='historyTitle'>history of tickets</h2>
//                     <Schedule months={months} week={week}
//                         buttonClicked={buttonClicked} />
//                 </div>

//             </React.Fragment>

//         );
//     }
// }

// export default Profile;