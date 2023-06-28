import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useEffect } from 'react';


function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	const [objErrors, setObjErrors] = useState({})

	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [showPassword, setShowPassword] = useState(false)
	


	useEffect(() => {
		let e = {}
		setObjErrors(e)
		if (!username) e.username = "Must submit a username"
		if (!email) e.email = "Must submit an email"
		if (!emailCheck(email)) e.emailCheck = "Invalid email"
		if (!password) e.password = "Must submit a password"
		if (password.length < 6) e.passwordLength = "Password must be at least 6 characters"
		if (password !== confirmPassword) e.confirmPassword = "Passwords must match"
	}, [username, email, password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true)
		// console.log("OBJ ERRORS", objErrors)
		if (Object.values(objErrors).length) return

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};


	const togglePassword = (e) => {
		e.preventDefault()
		if (showPassword === false) {
			setShowPassword(true)
		} else {
			setShowPassword(false)
		}
	}




	return (
		<>	<div className="signup-div">
				<h1>Sign Up</h1>
			</div>
			<form className="login-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="email-container">
					<div className="email-div q-text">
						Email
					</div>
					<input
						className="email-input input-field"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						// required
					/>
				</label>
				{hasSubmitted && objErrors.email && (
					<div className='error'>
						* {objErrors.email}
					</div>
				)}
				{hasSubmitted && objErrors.emailCheck && (
					<div className='error'>
						* {objErrors.emailCheck}
					</div>
				)}
				<label className="password-container">
					<div className="password-div q-text">
						Username
					</div>
					<input
						className="password-input input-field"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						// required
					/>
				</label>
				{hasSubmitted && objErrors.username && (
					<div className='error'>
						* {objErrors.username}
					</div>
				)}
				<label className="password-container">
					<div className="password-icon-div">
						<div className="password-div q-text">
							Password
						</div>
						<div className="toggle-password-div">
							<i onClick={togglePassword} className="fas fa-eye" />
						</div>
					</div>
					<input
						className="password-input input-field"
						type={showPassword === false ? "password" : "text"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						// required
					/>
					{/* <div className="toggle-password-div">
						<i onClick={togglePassword} className="fas fa-eye" />
					</div> */}
				</label>
				{hasSubmitted && objErrors.password && (
					<div className='error'>
						* {objErrors.password}
					</div>
				)}
				{hasSubmitted && objErrors.passwordLength && (
					<div className='error'>
						* {objErrors.passwordLength}
					</div>
				)}
				<label className="password-container">
					<div className="password-div q-text">
						Confirm Password
					</div>
					<input
						className="email-input input-field"
						type={showPassword === false ? "password" : "text"}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						// required
					/>
				</label>
				{hasSubmitted && objErrors.confirmPassword && (
					<div className='error'>
						* {objErrors.confirmPassword}
					</div>
				)}
				<button className="login-button" type="submit">Sign Up</button>

				<div className="torb-div">
					<p className="lets-getin-there">
						Buckle up!
					</p>
					<img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png" alt="alt" />
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;



export function emailCheck(str) {
	const regex = /^\S+@\S+\.\S+$/
	// console.log(!regex.test(email))
	if (!regex.test(str)) return false
	return true
}

