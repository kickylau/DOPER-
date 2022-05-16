
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import BookReservationModal from '../BookReservationModal';
import CreatePetModal from '../CreatePetModal';
import Walkers from '../Walker';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/pets' exact={true} activeClassName='active'>
            Pets
          </NavLink>
        </li>
        <li>
          <NavLink to='/reservations' exact={true} activeClassName='active'>
            Your Reservations
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        <li >
          <CreatePetModal />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
