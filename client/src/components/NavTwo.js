import React from 'react';
import { Link } from 'react-router-dom';
import film from '../images/movie.png'

const NavTwo = (props) => {
    const { logout } = props;
    return (
        <div className='d-flex justify-content-evenly align-items-center p-3 border rounded bg-c'>
            <Link className='text-decoration-none align-items-center text-white text-bold' to={'/home'}><h1>FilmBuffs<img className='mb-2' style={{ width: '45px' }} src={film} alt='' /></h1></Link>
            <div className='input-group w-50'>
            </div>
            <div className='d-flex justify-content-evenly align-items-center'>
                <Link to={'/home'} className='mx-3 text-decoration-none text-white text-bold'>Home</Link>
                <Link to={'/allReviews'} className='mx-3 text-decoration-none text-white'>Reviews</Link>
                <Link to={'/myReviews'} className='mx-3 text-decoration-none text-white'>My Reviews</Link>
                <button onClick={logout} className='btn btn-primary'>Logout</button>
            </div>
        </div>
    );
}

export default NavTwo;
