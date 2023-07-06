import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data)
    } else {
      closeModal()
    }
  }

  const handleClose = (e) => {
    e.preventDefault()
    closeModal()
  }

  const togglePassword = (e) => {
    e.preventDefault()
    if (showPassword === false) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }

  return (
    <><div className="login-modal-div-a">
      <div onClick={handleClose} className="x-div">
        <p id="x">
          X
        </p>
      </div>
    </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="gamepad-login-div">
          {/* <i className="fas fa-gamepad login-gamepad" /> */}
          <h1 >Log In</h1>
          {/* <div className="login-text login-text">Log In</div> */}
        </div>
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
            required
          />
        </label>

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
            required
          />
        </label>

        <div >

        </div>
        <button className="login-button" type="submit">Log In</button>
        {/* <div className="torb-div">
          <p className="lets-getin-there">
            Let's get in there!
          </p>
          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/1309ab1add1cc19189a2c8bc7b1471f88efa1073e9705d2397fdb37d45707d01.png" alt="alt" />
        </div> */}
      </form>
    </>
  );
}

export default LoginFormModal;
