import React from 'react'
import './Buttons.scss'
import { Link } from 'react-router-dom'

const Buttons = () => {
  return (
    <nav className='btn-nav'>
        <Link to='/login' className='link-btn'><button className='item-btn'>Login</button></Link>
        <Link to='/login/option' className='link-btn'><button className='item-btn'>Register</button></Link>
    </nav>
  )
}

export default Buttons