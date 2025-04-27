import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import {Route,Routes} from "react-router-dom"
import './App.css'
import Layout from './Layout'
import Login from "./components/Login"
import Register from "./components/Register"
import AllUrl from './components/AllUrl'
import UrlGeneratingPage from './components/UrlGeneratingPage'
import UserContextProvider from './context/UserContextProvider'
import Header from './components/Header'
import HomePage from './components/HomePage'
import QrGeneratingPage from './components/QrGeneratingPage'
import AllQrPage from './components/AllQrPage'
import AllUrlAnalyticsPage from './components/AllUrlAnalyticsPage'
function App() {
  
  axios.defaults.baseURL="http://localhost:8001";
  axios.defaults.withCredentials=true;
  return (

      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="url-gen-page" element={<UrlGeneratingPage />} />
            <Route path="all-url" element={<AllUrl />} />
            <Route path="gen-qr-page" element={<QrGeneratingPage/>}/>
            <Route path="all-qr" element={<AllQrPage/>}/>
            <Route path="url-analytics" element={<AllUrlAnalyticsPage/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
  );
}

export default App
