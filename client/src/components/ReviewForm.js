import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './DisplayAllReviews.css'


const ReviewForm = (props) => {
    const { id } = useParams();
    const [reviewOneMovie, setReviewOneMovie] = useState({});
    const navigate = useNavigate();
    const { allReviews, setAllReviews, logout } = props;
    const [errors, setErrors] = useState({})
    const [filmReview, setFilmReview] = useState({
        filmName: '',
        rating: 0,
        review: ''
    })

    // FOR GETTING THE MOVIE DATA
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=97caa1251b29e1aadf876687c073cfeb&language=en-US
        `)
            .then((result) => {
                setReviewOneMovie(result.data)
                setFilmReview({ ...filmReview, filmName: result.data.title })
            }).catch((err) => {
                console.log(err)
                navigate('/signUp')
            })
    }, [])

    // FOR CHANGING INPUT DATA
    const changeHandler = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setFilmReview({ ...filmReview, [e.target.name]: e.target.value })
    }

    // FOR SUBMITTING FORM
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/postReview', filmReview, { withCredentials: true })
            .then((res) => {
                // console.log(res)
                setAllReviews([...allReviews, res.data])
                navigate('/home')
            })
            .catch((err) => {
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
            <div className='d-flex justify-content-between align-items-center py-4'>
                <div className='w-50'>
                    <img style={{ width: '425px' }} src={`https://image.tmdb.org/t/p/w500${reviewOneMovie.poster_path}`} alt={reviewOneMovie.title} />
                </div>
                <div className='w-50 text-start'>
                    <form onSubmit={submitHandler} className='text-start'>
                        <div className='w-75'>
                            <h4>Write A Review</h4>
                            <label className='form-label my-1'>Film Name:</label>
                            <input className='form-control' type='text' placeholder={reviewOneMovie.title} disabled />

                            <label className='form-label my-1'>Rating:</label>
                            {
                                errors.rating ?
                                    <p className='text-danger'>{errors.rating.message}</p> :
                                    null
                            }
                            <input className='form-control' type='number' name='rating' value={filmReview.rating} onChange={changeHandler} />

                            <label className='form-label my-1'>Review:</label>
                            {
                                errors.review ?
                                    <p className='text-danger'>{errors.review.message}</p> :
                                    null
                            }
                            <textarea className='form-control' placeholder='Write a review...' name='review' value={filmReview.review} onChange={changeHandler}></textarea>

                            <button className='btn btn-primary my-2'>Submit Review</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;
