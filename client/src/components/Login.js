import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './logregform.css';
import { userContext } from '../context/UserContext';


const Login = () => {
    const { loggedInUser, setLoggedInUser } = useContext(userContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', userLogin, { withCredentials: true })
            .then((res) => {
                // console.log(res);
                setLoggedInUser(res.data.user)
                navigate('/home')
            })
            .catch((err) => {
                // console.log(err.response.data)
                setErrors(err.response.data)
            })
    }

    return (
        <div className='bg-img'>
            <div className='p-2'>
                <h1 className='text-decoration-none text-light fw-bold'>FilmBuffs</h1>
            </div >
            <form onSubmit={loginHandler} className='w-25 mx-auto user-form p-3'>
                <h2 className='mb-3'>Log In</h2>
                {
                    errors.message ?
                        <p className='text-danger'>{errors.message}</p> :
                        null
                }
                <div className="form-floating mb-2">
                    <input type="email" className="form-control" placeholder="Email" name='email' value={userLogin.email} onChange={onChangeHandler} />
                    <label >Email</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="password" className="form-control" placeholder="Password" name='password' value={userLogin.password} onChange={onChangeHandler} />
                    <label >Password</label>
                </div>
                <div className='mb-2'>
                    <Link to={'/signUp'}>Don't have an account? Sign Up</Link>
                </div>
                <div>
                    <button className='btn btn-primary'>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
