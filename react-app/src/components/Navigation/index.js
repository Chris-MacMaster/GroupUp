import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { fetchGroupsSearch, fetchEventsSearch } from '../../store/search';
import SearchBar from '../SearchBar/SearchBar';


// import { ReactComponent as ow_logo } from './ow_logo.jsx';

import OwLogo from './OwLogo'


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	// const dispatch = useDispatch()
	const history = useHistory()
	const dispatch = useDispatch()

	const handleHomeRedirect = (e) => {
		e.preventDefault()
		history.push('/')
	}

	// test successful! the fetches work and load into state correctly
	const handleTestSearch = (e) => {
		e.preventDefault()
		dispatch(fetchGroupsSearch())
		dispatch(fetchEventsSearch())
		history.push('/search/test')
	}



	return (
		<div className='nav-div'>
			<div className='inner-nav-div'>
				<div className='home-redirect-div'>
					{/* <OwLogo onClick={handleHomeRedirect} /> */}

					<img onClick={handleHomeRedirect} className='redirect-gr-img' src={process.env.PUBLIC_URL + "/ow-nav-pic.png"}  alt='alt' />
				</div>
				{/* test div for search */}
				{/* <div className='home-redirect-div'>
					<img onClick={handleTestSearch} className='redirect-gr-img' src={process.env.PUBLIC_URL + "/ow-nav-pic.png"} alt='alt' />
				</div> */}

				{/* test div for search bar */}
				<div className='home-redirect-div'>
					<SearchBar />
				</div>

				{isLoaded && (
					<div>
						<ProfileButton className="profile-button" user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;


// <blz-video class="background-video bltf0b14112aa14d1e3 background-active" loading="lazy" no-ratio="true" loop="true" autoplay="true" muted="true" playsinline="true" bp="min+" slot="background" webm:min-plus="https://blz-contentstack-assets.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt7e58bc9a78e1b6e7/6480e2644c9ff70768279f8a/Xbox_Trailer_04.webm" mp4:min-plus="https://blz-contentstack-assets.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt35bac81eb4147937/6480cd464c9ff70768279f82/Xbox_Trailer_03.mp4" listening="" webm="https://blz-contentstack-assets.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt7e58bc9a78e1b6e7/6480e2644c9ff70768279f8a/Xbox_Trailer_04.webm" mp4="https://blz-contentstack-assets.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt35bac81eb4147937/6480cd464c9ff70768279f82/Xbox_Trailer_03.mp4"></blz-video>