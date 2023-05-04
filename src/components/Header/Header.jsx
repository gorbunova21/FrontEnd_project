import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.scss";
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";

const Header = () => {
  const history = useLocation()
  const disabled = history.pathname === "/contact" || history.pathname === "/singin" || history.pathname === "/singup"
  return (
    <header className='header'>
      <Navbar />
      {!disabled && (
        <div className='header-content flex align-center justify-center flex-column text-center'>
          <SearchForm />
          <h1 className='text-white header-title ls-2'>Які ваші улюблені рецепти?</h1>
          <p className='text-uppercase text-white my-3 ls-1'>персоналізуйте свій досвід</p>
        </div>)}
    </header>
  )
}

export default Header