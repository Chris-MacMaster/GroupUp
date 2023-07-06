import React from 'react';
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchEventsSearch, fetchGroupsSearch, fetchSearchResults } from '../../store/search';


const SearchBar = () => {
    // const dispatch = useDispatch(
    const history = useHistory()
    const dispatch = useDispatch()
    const [parameters, setParameters] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        // load results into state
        dispatch(fetchGroupsSearch())
        dispatch(fetchEventsSearch())
        history.push(`/search/${parameters}`)
    }

    return (
        <div className=''>
            <div className='search-bar'>
                <form onSubmit={handleSubmit} className='search-bar-form'>
                    <input className='header-search' id='header-search' type='text' value={parameters}
                        onChange={(e) => setParameters(e.target.value)}
                        placeholder='Search for anything in the universe'></input>
                    <div className='telescope-search'>
                        <i className="fa-solid fa-magnifying-glass" onClick={handleSubmit}></i>
                    </div>
                </form>
            </div> 

        </div>
    );
};

export default SearchBar;



















