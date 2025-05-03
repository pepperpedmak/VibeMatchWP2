import React, { useState } from 'react';
import GeneratePage from './components/generatepage';
import ImageGenerator from './components/ImageGenerator';
import LoginPage from './login';
import GetPhoneNumberPage from './getPhonenum';
import EnterCodePage from './enterCode';
import SportsSelection from './pages/category/sports';
import RegisterPage from './register';
import PetSelection from './pages/category/pet';
import GamesSelection from './pages/category/games';
import TravelSelection from './pages/category/travel';
import MusicSelection from './pages/category/music';
import CollectionSelection from './pages/category/collections';
import MovieSelection from './pages/category/movie';
import Home from './components/home';
import ForgotPassword from './forgotpassword';
import Profile from './profile';
import BeforeLogin from './beforeloginpage';
import GetPasswordPage from './password';
import Navbar from './components/navbar';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Liked from './components/like';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BeforeLogin />,
    },
    {
      path: '/login',
      element: <LoginPage onLogin={handleLogin} />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/select-sports',
      element: <SportsSelection />,
    },
    {
      path: '/select-animals',
      element: <PetSelection />,
    },
    {
      path: '/select-games',
      element: <GamesSelection />,
    }, 
    {
      path: '/select-travel',
      element: <TravelSelection />,
    },
    {
      path: '/select-music',
      element: <MusicSelection />,
    },
    {
      path: '/select-collections',
      element: <CollectionSelection />,
    },
    {
      path: '/select-movies',
      element: <MovieSelection />,
    },
    {
      path: '/generate-image',
      element: <GeneratePage />,
    },
    {
      path: "/home",
      element: <Home />, 
    },
    {
      path: "/profile",
      element: <Profile />, 
    },
    {
      path: "/like",
      element: <Liked />, 
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;

