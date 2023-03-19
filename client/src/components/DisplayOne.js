import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './DisplayAllReviews.css'


const DisplayOne = (props) => {
    const { id } = useParams();
    const { allReviews, setAllReviews, logout } = props;
    const [oneMovie, setOneMovie] = useState({})
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=97caa1251b29e1aadf876687c073cfeb&language=en-US
        `)
            .then((result) => {
                // console.log(result.data)
                setOneMovie(result.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [id])

    useEffect(() => {
        axios.get('http://localhost:8000/api/getAllReviews')
            .then((allReviews) => {
                // console.log(allReviews.data)
                setAllReviews(allReviews.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className='p-3'>
                <div className='d-flex justify-content-evenly align-items-center p-3 border rounded bg-c'>
                    <Link to={'/home'} className='text-decoration-none text-white'><h1>FilmBuffs</h1></Link>
                    <div className='input-group w-50'>
                    </div>
                    <div className='d-flex justify-content-space-evenly align-items-center'>
                        <Link to={'/home'} className='mx-3 text-decoration-none text-white'>Home</Link>
                        <Link to={'/allReviews'} className='mx-3 text-decoration-none text-white'>Reviews</Link>
                        <Link to={'/myReviews'} className='mx-3 text-decoration-none text-white'>My Reviews</Link>
                        <button onClick={logout} className='btn btn-primary'>Logout</button>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center py-4'>
                    <div className='w-50'>
                        <img style={{ width: '425px' }} src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`} alt={oneMovie.title} />
                    </div>
                    <div className='w-50 text-start'>
                        <h4>Film Overview</h4>
                        <p className='w-75 py-2 border-top border-bottom border-dark border-2 text-start'>{oneMovie.overview}</p>
                        <h4 className='my-3'>Release Date: {oneMovie.release_date}</h4>
                        <h4 className='my-3'>Box Office Sales: {oneMovie.revenue}</h4>
                        <h4 className='my-3'>Runtime: {oneMovie.runtime} minutes</h4>
                        <h4 className='my-3'>Average Rating: {oneMovie.vote_average}/10</h4>
                        <Link to={`/createReview/${oneMovie.id}`} className='w-75 btn btn-dark form-control my-3'>Review {oneMovie.title}</Link>
                    </div>
                </div>
            </div>
            <div className='my-3 '>
                <h3 className='text-start ms-5 mt-3'>MOVIE REVIEWS:</h3>
                <div className='w-75 mx-auto'>
                    {
                        allReviews.map((review) => (
                            <div className='my-3' key={review._id}>
                                {
                                    review.filmName === oneMovie.title ?
                                        <div className='p-3 m-3 review'>
                                            <h4 className='text-start'>{review.review}</h4>
                                            <h5 className='text-start'>{review.rating} out of 10</h5>
                                            <h5 className='text-end'>{formatter.format(Date.parse(review.createdAt))}</h5>
                                        </div> :
                                        null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default DisplayOne;
