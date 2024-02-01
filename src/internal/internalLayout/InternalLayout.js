import React, { useState, useEffect } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import '../../assets/styles/InternalLayout.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import AppMenu from './components/appMenu/AppMenu';
import { useTheme } from '../../helpers/ThemeContext';
import { useEmail } from '../../helpers/EmailContext';
import { useUserType } from '../../helpers/UserTypeContext';
import { useTranslation } from 'react-i18next';

const InternalLayout = () => {
    const { i18n } = useTranslation();
    const { themeMode } = useTheme();
    const { setUser } = useUserType();
    const { setLoggedInEmail } = useEmail();
    const navigate = useNavigate();
    

    useEffect(() => {
        const storedLanguage = localStorage.getItem('i18nextLng');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }

        const storedEmail = localStorage.getItem('email');
        const storedUserType = localStorage.getItem('userType');
      
        if (storedEmail && storedUserType) {
            setLoggedInEmail(storedEmail);
            setUser(storedUserType);
        } else {
            navigate('/login');
        }
    }, [i18n, navigate, setLoggedInEmail, setUser]);

    return (
        <div className={`all-internal`}>
            <Header/>
            <section className='internal-main'>
                <div className='col-3 d-none d-lg-block'>
                    <AppMenu/>
                </div>
                <div className={`col-9 main ${themeMode}`}>
                    <Outlet/>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default InternalLayout;
