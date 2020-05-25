import React from "react";
import {Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css';

import iconNavbar from '../assets/iconNavbar.png';

function Navbar(){

  return(
    <div className='container'>

          <nav className='navbar navbar-expand-lg navbar-light'>

            <Link to={'/'} className='navbar-brand'> 
              <div>
                <img className="iconNavbar" src={iconNavbar} alt="iconNavbar"/>
                Pokémon React
              </div>
            </Link>

            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav mr-auto'>
                <li><Link to={'/'} className='nav-link'>Home</Link></li>
                <li><Link to={'/pokedex'} className='nav-link'>The Pokédex</Link></li>
                <li><Link to={'/mypokemons'} className='nav-link'>My Pokémons</Link></li>
                <li><Link to={'/gymleader'} className='nav-link'>Gym Leader Battle</Link></li>
              </ul>
            </div>

          </nav>

        </div>
  );

}

export default Navbar;