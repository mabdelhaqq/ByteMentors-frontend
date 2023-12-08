import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import '../../assets/styles/AuthLayout.scss'
import "bootstrap/dist/css/bootstrap.min.css";

const AuthLayout = () => {
  return (
    <div className='all-login'>
        <Header/>
        <section className='section-login'>
            <Outlet/>
        </section>
        <Footer/>
    </div>
  )
}

export default AuthLayout