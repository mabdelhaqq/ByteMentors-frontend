import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import '../../assets/styles/InternalLayout.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import AppMenu from './components/appMenu/AppMenu';
import { useTheme } from '../../helpers/ThemeContext';

const InternalLayout = () => {
    const { themeMode } = useTheme();
  return (
    <div className={`all-internal ${themeMode}`}>
        <Header/>
        <section className='internal-main'>
            <div className='col-3 d-none d-lg-block'>
                <AppMenu/>
            </div>
            <div className='col-9 main'>
                <Outlet/>
            </div>
        </section>
        <Footer/>
    </div>
  )
}

export default InternalLayout;
