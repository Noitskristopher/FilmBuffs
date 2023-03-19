import React, { useState } from 'react';
import Homepage from '../components/Homepage';
import Nav from '../components/Nav';
import Search from '../components/Search';
import axios from 'axios';

const Main = (props) => {
    const [movie, setMovie] = useState([])
    const { logout } = props;
    const [searchInput, setSearchInput] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=97caa1251b29e1aadf876687c073cfeb&language=en-US&query=${searchInput}`)
            // console.log('TEMPLATE LITERAL', `https://api.themoviedb.org/3/search/movie?api_key=97caa1251b29e1aadf876687c073cfeb&language=en-US&query=${searchInput}`);
            // console.log(response.data);
            setMovie(response.data.results)
            setSearchInput('')
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='p-3 bg-secondary-subtle'>
            <Nav submitHandler={submitHandler} movie={movie} setMovie={setMovie} searchInput={searchInput} setSearchInput={setSearchInput} logout={logout} />
            <Search movie={movie} setMovie={setMovie} />
            <Homepage />
        </div>
    );
}

export default Main;
