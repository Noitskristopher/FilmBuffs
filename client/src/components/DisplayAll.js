import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DisplayAllReviews.css';


const DisplayAll = (props) => {
    const { allReviews, setAllReviews, logout } = props;

    useEffect(() => {
        axios.get('http://localhost:8000/api/getAllReviews', { withCredentials: true })
            .then((allReviews) => {
                // console.log(allReviews.data)
                setAllReviews(allReviews.data)
            })
            .catch((err) => {
                console.log(err)
                setAllReviews([])
            })
    }, [])

    // const removeReview = reviewId => {
    //     setAllReviews(allReviews.filter(review => review._id !== reviewId))
    // }

    // const deleteReview = (reviewId) => {
    //     axios.delete('http://localhost:8000/api/deleteReview/' + reviewId)
    //         .then((res) => {
    //             removeReview(reviewId)
    //             navigate('/allReviews')
    //         })
    //         .catch(err => console.log(err))
    // }

    return (
        <div className='p-3'>
            <div className=''>
                <div className='d-flex justify-content-evenly align-items-center p-3 border rounded bg-c'>
                    <Link className='text-decoration-none align-items-center text-white text-bold' to={'/home'}><h1>FilmBuffs</h1></Link>
                    <div className='input-group w-50'>
                    </div>
                    <div className='d-flex justify-content-evenly align-items-center'>
                        <Link to={'/home'} className='mx-3 text-decoration-none text-white text-bold'>Home</Link>
                        <Link to={'/allReviews'} className='mx-3 text-decoration-none text-white'>Reviews</Link>
                        <Link to={'/myReviews'} className='mx-3 text-decoration-none text-white'>My Reviews</Link>
                        <button onClick={logout} className='btn btn-primary'>Logout</button>
                    </div>
                </div>
                <div className=''>
                    <h3 className='text-black fw-bold pt-3'>ALL REVIEWS: </h3>
                    <div className='d-flex flex-wrap justify-content-around'>
                        {
                            allReviews.map((review) => (
                                <div className='p-3 m-3 w-25 review' key={review._id}>
                                    <h4 className='text-start fw-bold'>{review.filmName}</h4>
                                    <h5 className='text-start fw-bold'>{review.rating} out of 10</h5>
                                    <p className='text-start' > {review.review}</p>
                                </div>
                            ))
                        }
                    </div>
                </div >
            </div>
        </div>
    );
}

export default DisplayAll;
