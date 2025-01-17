import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.scss';
import dropShadow from '../../assets/Asset 1.png';
// import { useNavigate, useLocation } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;



const SearchBar = ({ setMarkers, setEvent, setDetails, markers, setResults, searchTerm }) => {
    const [query, setQuery] = useState(searchTerm || '');
    const navigate = useNavigate();


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchData();
            navigate(`/search?s=${encodeURIComponent(query)}`);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/mentors?s=${encodeURIComponent(query)}`);
            navigate(`/search?s=${encodeURIComponent(query)}`);
            console.log('reload')

            const mentors = response.data.mentors;

            const globeMarkers = mentors.map((mentor) => {
                return {
                    name: `${mentor.first_name} ${mentor.last_name}`,
                    id: mentor.id,
                    city: mentor.city,
                    color: 'blue',
                    coordinates: [parseFloat(mentor.lat), parseFloat(mentor.long)],
                    value: mentor.value || 0,
                };
            });

            setMarkers(globeMarkers)
            setResults(response.data)

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();

        // window.addEventListener('keydown', handleKeyPress);

        // return () => {
        // window.removeEventListener('keydown', handleKeyPress);
        // };
    }, [query, navigate]);



    return (
        <>
            <input
                type="text"
                className='search__bar'
                placeholder='Search...'
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
        </>
    );
};

export default SearchBar;