import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavTwo from './NavTwo';
import './DisplayAllReviews.css';

const DisplayAllByLoggedUser = (props) => {
    const [usersReviews, setUsersReviews] = useState([])
    const { logout } = props;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/reviewsByLoggedInUser', { withCredentials: true })
            .then((allReviews) => {
                // console.log(allReviews.data)
                setUsersReviews(allReviews.data)
            })
            .catch((err) => {
                console.log(err)
                setUsersReviews([])
            })
    }, [])

    const removeReview = reviewId => {
        setUsersReviews(usersReviews.filter(review => review._id !== reviewId))
    }

    const deleteReview = (reviewId) => {
        axios.delete('http://localhost:8000/api/deleteReview/' + reviewId)
            .then((res) => {
                removeReview(reviewId)
                navigate('/myReviews')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='p-3'>
            <NavTwo logout={logout} />
            <div className='pt-3'>
                <h3 className='text-dark fw-bold'>MY REVIEWS: </h3>
                <div className='d-flex flex-wrap justify-content-around' >
                    {
                        usersReviews.map((review) => (
                            <div className='p-3 m-3 w-25 review' key={review._id}>
                                <h4 className='text-start fw-bold'>{review.filmName}</h4>
                                <h5 className='text-start fw-bold'>{review.rating} out of 10</h5>
                                <p className='text-start' > {review.review}</p>
                                <div className='text-end'>
                                    <Link to={`/editReview/${review._id}`} className='btn btn-light mx-2'>Edit</Link>
                                    <button onClick={(e) => { deleteReview(review._id) }} className='btn btn-danger'>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div >
        </div>
    );
}

export default DisplayAllByLoggedUser;
