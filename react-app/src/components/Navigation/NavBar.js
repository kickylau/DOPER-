import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import DemoButton from '../auth/DemoButton';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import AboutButton from './AboutButton';
import SignUpFormModal from '../SignUpModal';
import CreatePetModal from '../CreatePetModal';
import BookReservationModal from '../BookReservationModal';
import { SiDatadog } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
// import booking from "./booking.png";
// import dog from "./dog.png";
// import profile from "./profile.png";
// import me from "./me.png";
import Walkers from '../Walker';


const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <header>
        <ul className="logged-in-nav">
          <li className="nav button4">
            {/* <img src={me} alt="Me" className="icon-me" /> */}
            <AboutButton />
          </li>
          <li className="nav">
            {/* <img src={booking} alt="Booking" className="icon-booking" /> */}
            <NavLink to="/reservations" exact={true} id="buttonbutton">
              Reservations
            </NavLink>
          </li>
          <li className="nav">
            {/* <img src={dog} alt="Dog" className="icon-dog" /> */}
            <NavLink to="/pets" exact={true} id="buttonbutton">
              Your Pets
            </NavLink>
          </li>

          <li className="nav button3">
            {/* <img src={profile} alt="Profile" className="icon-profile" /> */}
            <ProfileButton />
          </li>
        </ul>
      </header>
    );
  } else {
    sessionLinks = (
      <header>
        <ul className="logged-out-nav">
          <li className="nav button4">
            <AboutButton />
          </li>
          <li className="nav button1">
            <DemoButton />
          </li>
          <li className="nav button2">
            <LoginFormModal />
          </li>
          <li className="nav button3">
            <SignUpFormModal />
          </li>
        </ul>
      </header>
    );
  }


  return (
    <nav className="nav-container">
      <ul className="nav-bar-left">
        <li className="nav-list">
          <NavLink to='/Home' exact={true} className="nav-link">
            <img src="/static/doper.png" className="icon" alt="Doper Icon" />
            <a className="doper">Doper</a>
          </NavLink>
        </li>
      </ul>


      <ul className="nav-bar-right">
        <li>{sessionLinks}</li>
      </ul>
    </nav>

    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/home' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/pets' exact={true} activeClassName='active'>
    //         Pets
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/reservations' exact={true} activeClassName='active'>
    //         Your Reservations
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //     <li >
    //       <CreatePetModal />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
