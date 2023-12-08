import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from './components/logo/Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.scss'
import { useTheme } from '../../../../helpers/ThemeContext';


const Header = () => {
  const navigate = useNavigate();
  const [isDropDownMenu, setDropDownMenu] = useState(false);
  const { themeMode, toggleTheme } = useTheme();
  const toggleMenu = () => {
    setDropDownMenu(!isDropDownMenu);
};
  return (
    <header className={`in-header ${themeMode}`}>
        <FontAwesomeIcon icon={faBars} className='col-1 btn-menu d-block d-lg-none' onClick={toggleMenu}/>
        {isDropDownMenu && (
                <div className="dropdown-menumenu">
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/home/');setDropDownMenu(!isDropDownMenu)}}>Personal Page</div>
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/home/personalcompany');setDropDownMenu(!isDropDownMenu)}}>Personal Page</div>
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/home/opp');setDropDownMenu(!isDropDownMenu)}}>Training Opportunities</div>
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/home/myopp');setDropDownMenu(!isDropDownMenu)}}>My Opportunities</div>
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/home/companies');setDropDownMenu(!isDropDownMenu)}}>Companies</div>
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/home/plans');setDropDownMenu(!isDropDownMenu)}}>Training Plans</div>
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/home/settings');setDropDownMenu(!isDropDownMenu)}}>Settings</div>
                    <div className="dropdown-itemmenu" onClick={() => { navigate('/login/');setDropDownMenu(!isDropDownMenu)}}>Log out</div>

                </div>
            )}
        <div className='col-11 col-lg-12'>
            <Logo/>
        </div>
    </header>
  )
}

export default Header