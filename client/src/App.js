import './App.css';
import Main from './views/Main';
import { useState } from 'react';
import DisplayOne from './components/DisplayOne';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ReviewForm from './components/ReviewForm';
import DisplayAll from './components/DisplayAll';
import EditForm from './components/EditForm';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import { UserProvider } from './context/UserContext';
import axios from 'axios';

function App() {
  const [allReviews, setAllReviews] = useState([])
  const navigate = useNavigate();
  const logout = () => {
    axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .then((res) => {
        // console.log(res)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Main logout={logout} />} />
          <Route path='/view/:id' element={<DisplayOne allReviews={allReviews} setAllReviews={setAllReviews} logout={logout} />} />
          <Route path='/createReview/:id' element={<ReviewForm allReviews={allReviews} setAllReviews={setAllReviews} logout={logout} />} />
          <Route path='/allReviews' element={<DisplayAll allReviews={allReviews} setAllReviews={setAllReviews} logout={logout} />} />
          <Route path='/myReviews' element={<Profile allReviews={allReviews} setAllReviews={setAllReviews} logout={logout} />} />
          <Route path='/editReview/:id' element={<EditForm logout={logout} />} />
          <Route path='/signUp' element={<Register />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
