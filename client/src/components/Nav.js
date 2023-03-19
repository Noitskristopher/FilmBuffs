import React from 'react';
import { Link } from 'react-router-dom';
import './logregform.css';


const Nav = (props) => {
    const { submitHandler, searchInput, setSearchInput, logout } = props;
    // const uuid = window.localStorage.getItem('uuid')

    return (
        <div className='d-flex justify-content-evenly align-items-center p-4 border rounded bg-c'>
            <Link className='text-decoration-none align-items-center text-white text-bold' to={'/home'}><h1>FilmBuffs</h1></Link>
            <form onSubmit={submitHandler} className='input-group w-50'>
                <input type='search' name="search" className='form-control' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button className='btn btn-primary'>Search</button>
            </form>
            <div className='d-flex justify-content-space-evenly align-items-center'>
                <Link to={'/home'} className='mx-3 text-decoration-none text-white text-bold'>Home</Link>
                <Link to={'/allReviews'} className='mx-3 text-decoration-none text-white text-bold'>Reviews</Link>
                <Link to={'/myReviews'} className='mx-3 text-decoration-none text-white text-bold'>My Reviews</Link>
                <button onClick={logout} className='btn btn-primary'>Logout</button>
            </div>
        </div >
    );
}

export default Nav;
