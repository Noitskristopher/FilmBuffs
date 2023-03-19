import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './logregform.css';


const Homepage = () => {
    const [popularMovies, setPopularMovies] = useState({})

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=97caa1251b29e1aadf876687c073cfeb`)
            .then((result) => {
                // console.log(result.data.results)
                setPopularMovies(result.data.results)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='bg-secondary-subtle'>
            <div className=''>
                <h3 className='fw-bold pt-3'>POPULAR FILMS THIS WEEK</h3>
            </div>
            <div className='d-flex flex-wrap justify-content-around w-75 mx-auto' >
                {
                    popularMovies.length > 0 ?
                        popularMovies.map((movie, idx) => (
                            <div className='p-2 w-25' key={idx}>
                                <Link to={`/view/${movie.id}`}><img style={{ width: '265px' }} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' /></Link>
                                <Link to={`/view/${movie.id}`} className='text-decoration-none fw-bold'><p className='mt-1'>{movie.title}</p></Link>
                            </div>
                        ))
                        :
                        null
                }
            </div >
        </div >
    );
}

export default Homepage;
