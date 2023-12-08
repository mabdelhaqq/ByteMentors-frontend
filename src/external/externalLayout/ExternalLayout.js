import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import '../../assets/styles/ExternalLayout.scss'
import "bootstrap/dist/css/bootstrap.min.css";

const ExternalLayout = () => {
  return (
    <div className='all'>
        <Header/>
        <section className='section-main'>
            <Outlet/>
        </section>
        <Footer/>
    </div>
  )
}

export default ExternalLayout