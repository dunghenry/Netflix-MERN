import React from 'react'
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import './navbar.scss';
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <NavLink to="/" exact className="link" activeClassName="selected">
            <span>Home</span>
          </NavLink>
          <NavLink to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </NavLink>
          <NavLink exact to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </NavLink>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              {/* <span onClick={() => dispatch(logout())}>Logout</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Navbar