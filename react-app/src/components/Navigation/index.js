import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


import * as sessionActions from "../../store/session"
// import {useDispatch} from "react-redux"

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const history = useHistory()

	const demoLogin = (e) => {
		

		// return dispatch(sessionActions.login({
		// 	credential: "demo@aa.io",
		// 	password: "password"
		// }))
		// 	.then(closeModal)
		// 	.catch(
		// 		async (res) => {
		// 			const data = await res.json();
		// 			if (data && data.errors) setErrors(data.errors);
		// 		}
		// 	);
	}

	const handleHomeRedirect = (e) => {
		e.preventDefault()
		history.push('/')
	}



	return (
		<div className='nav-div'>
			<div>
				{/* <i onClick={handleHomeRedirect} className="fas fa-gamepad nav-gamepad" /> */}
				<img onClick={handleHomeRedirect} className='redirect-gr-img' src='https://img0.etsystatic.com/163/0/13555616/il_570xN.1112156364_cruz.jpg' alt='alt' />
				{/* <NavLink exact to="/">Home</NavLink> */}
			</div>
			{isLoaded && (
				<div>
					<ProfileButton className="profile-button" user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;