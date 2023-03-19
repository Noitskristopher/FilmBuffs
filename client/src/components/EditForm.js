import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './DisplayAllReviews.css'


const EditForm = (props) => {
    const { id } = useParams();
    const { logout } = props;
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [filmReview, setFilmReview] = useState({
        filmName: '',
        rating: 0,
        review: ''
    })
    useEffect(() => {
        axios.get(`http://localhost:8000/api/getOneReview/${id}`)
            .then((res) => {
                // console.log(res.data)
                setFilmReview(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    // FOR CHANGING INPUT DATA
    const changeHandler = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setFilmReview({ ...filmReview, [e.target.name]: e.target.value })
    }

    // FOR SUBMITTING FORM
    const editHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/editReview/${id}`, filmReview)
            .then((res) => {
                // console.log(res)
                navigate('/home')
            })
            .catch((err) => {
                // console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='p-3'>
            <div className='d-flex justify-content-evenly align-items-center p-3 border rounded bg-c'>
                <Link to={'/home'} className='text-decoration-none text-white'><h1>FilmBuffs</h1></Link>
                <div className='input-group w-50'>
                </div>
                <div className='d-flex justify-content-evenly align-items-center'>
                    <Link to={'/home'} className='mx-3 text-decoration-none text-white'>Home</Link>
                    <Link to={'/allReviews'} className='mx-3 text-decoration-none text-white'>Reviews</Link>
                    <Link to={'/myReviews'} className='mx-3 text-decoration-none text-white'>My Reviews</Link>
                    <button onClick={logout} className='btn btn-primary'>Logout</button>
                </div>
            </div>
            <div className='py-4'>
                <form onSubmit={editHandler} className='w-50 mx-auto'>
                    <h4>Edit Your Review</h4>

                    <label className='form-label my-1'>Film Name:</label>
                    <input className='form-control' type='text' name='filmName' value={filmReview.filmName} disabled />

                    <label className='form-label my-1'>Rating:</label>
                    {
                        errors.rating ?
                            <p className='text-danger'>{errors.rating.message}</p> :
                            null
                    }
                    <input className='form-control' type='number' name='rating' onChange={changeHandler} value={filmReview.rating} />

                    <label className='form-label my-1'>Review:</label>
                    {
                        errors.review ?
                            <p className='text-danger'>{errors.review.message}</p> :
                            null
                    }
                    <textarea className='form-control' placeholder='Write a review...' name='review' value={filmReview.review} onChange={changeHandler}></textarea>

                    <button className='btn btn-primary my-2'>Submit Review</button>
                </form>
            </div>
        </div>
    );
}

export default EditForm;
