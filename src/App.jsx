import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useRef } from "react";
import "./App.scss";
import World from './components/World/World';
import Header from './components/Header/Header';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';



const App = () => {
    const [markers, setMarkers] = useState([]);
    const [event, setEvent] = useState(null);
    const [details, setDetails] = useState(null);

    return (
        <div className='appContainer'>
            <BrowserRouter>
                <Header />
                <div className='pageContainer'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/searchResults"></Route> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" />
                        <Route path="/my-account" />
                        <Route path="/terms-conditions" />
                        <Route path="/privacy-policy" />
                        <Route path="/*" notFoundPage={<NotFoundPage />} />
                    </Routes>
                </div>
                <World
                    setMarkers={setMarkers}
                    setEvent={setEvent}
                    setDetails={setDetails}
                    details={details}
                    markers={markers}
                />
            </BrowserRouter >
        </div>
    );
};

export default App
