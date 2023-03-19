import React from 'react';
import { Link } from 'react-router-dom';

const Search = (props) => {
    const { movie } = props;
    return (
        <div className=''>
            <div className='d-flex flex-wrap justify-content-around w-75 mx-auto' >
                {
                    movie.length > 0 ?
                        <div className='p-2 w-25'>
                            <Link to={`/view/${movie[0].id}`}><img style={{ width: '265px' }} src={'https://image.tmdb.org/t/p/w500/' + movie[0].poster_path} alt='movie-poster' /></Link>
                            <Link to={`/view/${movie[0].id}`} className='text-decoration-none text-black'><p>{movie[0].title}</p></Link>
                        </div> :
                        null
                }
            </div>
        </div>
    );
}

export default Search;
