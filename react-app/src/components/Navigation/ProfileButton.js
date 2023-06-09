import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout, login } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import { useHistory } from "react-router-dom";

import "./ProfileButton.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const handleDemoLogin = (e) => {
    e.preventDefault()
    dispatch(login("demo@aa.io", "password"))
  }

  const handleYourGroups = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push(`/user-groups`)
  }

  const handleYourEvents = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push(`/user-events`)
  }

  const handleUserDetails = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push(`/user-details`)
  }

  const handleCreateGroup = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push(`/forms/create-group`)
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
    {/* <div className="user-button-div"> */}
        {/* <p className="fa-user-button">

        </p> */}
        <button className="fa-user-button user-nav-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
          <p className='account-text'>
            Account
          </p>
        </button>
    {/* </div> */}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="prof-button-div">
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div className="your-links" onClick={handleYourGroups}>Your Groups</div>
              <div className="your-links" onClick={handleYourEvents}>Your Events</div>
              <div className="your-links" onClick={handleUserDetails}>User-Details</div>
              <div className="your-links" onClick={handleCreateGroup}>Create a Group</div>
              <div>
                <button onClick={handleLogout}>Log Out</button>
              </div>
          </div>
        ) : (
          <div className="log-signup-div">
          
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal className="login-form-modal" />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />

            <div onClick={handleDemoLogin} className='button demo-user-button'>
              Demo User
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
