import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Header.scss";
import { MdFoodBank} from "react-icons/md";
import { IoMdMenu} from "react-icons/io";
import { useSidebarContext } from '../../context/sidebarContext';
import { useMealContext } from '../../context/mealContext';
import { setToken } from '../../actions/mealsActions';

const Navbar = () => {
  const {openSidebar} = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);
  const { token, dispatch } = useMealContext()

  const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 60){
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  })

  return (
    <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled': ""}`}>
      <div className='container w-100'>
        <div className='navbar-content text-white'>
          <div className='brand-and-toggler flex align-center justify-between'>
            <Link to = "/" className='navbar-brand fw-3 fs-22 flex align-center'>
              <MdFoodBank />
              <span className='navbar-brand-text fw-7'>reciep.</span>
            </Link>
            <div className='navbar-btns flex align-center'>
              <Link to = "/contact" className='navbar-brand fw-3 fs-22 flex align-center mx-4'>
                <span className='navbar-brand-text fw-7'>Contact</span>
              </Link>
              {token ? (
                <button type = "button" className='navbar-show-btn text-white mx-3' onClick={() => { 
                  localStorage.removeItem('token')
                  setToken(dispatch, null)
                }}>
                  <span className='navbar-brand-text fw-7'>logout</span>
                </button>
              ) : (
                <><Link to="/singin" className='navbar-brand fw-3 fs-22 flex align-center mx-4'>
                    <span className='navbar-brand-text fw-7'>login</span>
                  </Link><Link to="/singup" className='navbar-brand fw-3 fs-22 flex align-center mx-4'>
                      <span className='navbar-brand-text fw-7'>singup</span>
                    </Link></>
              )}
              <button type = "button" className='navbar-show-btn text-white' onClick={() => openSidebar()}>
                <IoMdMenu size = {27} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar