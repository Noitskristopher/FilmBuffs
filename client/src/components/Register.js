import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './logregform.css';

const Register = (props) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [userReg, setUserReg] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChangeHandler = (e) => {
        setUserReg({ ...userReg, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', userReg, { withCredentials: true })
            .then((res) => {
                // console.log(res)
                navigate('/home')
            })
            .catch((err) => {
                // console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
            })
    }

    return (
        <div className='bg-img'>
            <div className=''>
                <div className='p-2'>
                    <h1 className='text-decoration-none text-light fw-bold'>FilmBuffs</h1>
                </div >
                <form onSubmit={onSubmitHandler} className='w-25 mx-auto user-form p-3'>
                    <h2>Create Account</h2>
                    <p>Create an account to be able to post reviews.</p>
                    <div className="form-floating mb-2">
                        {
                            errors.firstName ?
                                <p className='text-danger'>{errors.firstName.message}</p> :
                                null
                        }
                        <input type="text" className="form-control" placeholder="name@example.com" name='firstName' value={userReg.firstName} onChange={onChangeHandler} />
                        <label>First Name</label>
                    </div>
                    <div className="form-floating mb-2">
                        {
                            errors.lastName ?
                                <p className='text-danger'>{errors.lastName.message}</p> :
                                null
                        }
                        <input type="text" className="form-control" placeholder="Password" name='lastName' value={userReg.lastName} onChange={onChangeHandler} />
                        <label>Last Name</label>
                    </div>
                    <div className="form-floating mb-2">
                        {
                            errors.email ?
                                <p className='text-danger'>{errors.email.message}</p> :
                                null
                        }
                        <input type="email" className="form-control" placeholder="Email" name='email' value={userReg.email} onChange={onChangeHandler} />
                        <label >Email</label>
                    </div>
                    <div className="form-floating mb-2">
                        {
                            errors.password ?
                                <p className='text-danger'>{errors.password.message}</p> :
                                null
                        }
                        <input type="password" className="form-control" placeholder="Password" name='password' value={userReg.password} onChange={onChangeHandler} />
                        <label >Password</label>
                    </div>
                    {
                        errors.confirmPassword ?
                            <p className='text-danger'>{errors.confirmPassword.message}</p> :
                            null
                    }
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" placeholder="Confirm Password" name='confirmPassword' value={userReg.confirmPassword} onChange={onChangeHandler} />
                        <label>Confirm Password</label>
                    </div>
                    <div className='mb-2'>
                        <Link to={'/'}>Already have an account?</Link>
                    </div>
                    <div>
                        <button className='btn btn-primary'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
