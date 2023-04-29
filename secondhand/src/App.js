import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import FeedbackBanner from './FeedbackBanner.js';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer.js';
import Menu from './Pages/HomePage/Menu';
import Login from './Pages/LoginAndRegister/Login';
import Register from './Pages/LoginAndRegister/Register';
import ProductPage from './Pages/ProductPage/ProductPage';
import SearchResult from './Pages/SearchedResultPage/SearchResult';
import Account from './Pages/Profile/Profile';
import NotFound from './Pages/NotFound';
import NewAnnonce from './Pages/NewAnnonce/NewAnnonce';
import Favorites from './Pages/Profile/Favorites/Favorites';
import MyAnnonces from './Pages/Profile/MyAnnonces/MyAnnonces';
import Profile from './Pages/Profile/Profile/Profile.js';

import { userActions } from './features/userSlice';
import { logoutRequest } from './features/userSliceActions.js';
import { fetchNorwayDistricts } from './features/appDataSliceActions.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
    const user = JSON.parse(window.localStorage.getItem('user'));
    const expiry = JSON.parse(window.localStorage.getItem('expiry'));
    const date = new Date();

    if (isLoggedIn === null || user === null) return;
    
    if(date.getTime() > expiry) {
      dispatch(logoutRequest());
      return;
    }
    if(isLoggedIn && user) {
      dispatch(userActions.login(user))
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchNorwayDistricts());
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
    return (
      <GoogleOAuthProvider clientId='1011630835579-od6btk63gd1bio6bk413r76mh6q0s9s8.apps.googleusercontent.com'>
     <Router>
        <div style={{marginBottom : 100}}>
          <Navbar ></Navbar>
        </div>
        <div>
        <Routes>
              <Route path='/login' element={<Login/>}/>
                <Route path="/register" element={<Register/>}></Route>
                <Route path='/' element={<Menu/>}/>
                <Route path='/min-konto' element={<Account/>}/>
                <Route path='/favoritter' element={<Favorites/>}/>
                <Route path='/mine-annonser' element={<MyAnnonces/>}/>
                <Route path='/nyannonse' element={<NewAnnonce/>}/>
                <Route path='/profil' element={<Profile/>}/>
                <Route  path='/search' element={<SearchResult/>}/>
                <Route path={'/produkt/:annonceId'} element={<ProductPage/>}/>
                <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer></Footer>
        </div>
     </Router>
        <FeedbackBanner></FeedbackBanner>
     </GoogleOAuthProvider>
    );
  }


export default App;
