import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './components/logo/Logo'
import Toolbar from './components/toolbar/Toolbar'
import Buttons from './components/buttons/Buttons'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faRightToBracket } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
    const navigate = useNavigate();
    const [isDropDownToolbar, setDropDownToolbar] = useState(false);
    const [isDropDownLogin, setDropDownLogin] = useState(false);
    const toggleToolbar = () => {
        setDropDownToolbar(!isDropDownToolbar);
    };
    const toggleLogin = () => {
        setDropDownLogin(!isDropDownLogin);
    };
  return (
    <header className='ex-header'>
        <div className='col-6 col-md-4 col-lg-3'>
            <Logo/>
        </div>
        <div className='col-6 d-none d-lg-block'>
            <Toolbar/>
        </div>
        <div className='col-2 d-block d-lg-none display-toolbar'>
            <FontAwesomeIcon icon={faGripLines} onClick={toggleToolbar}/>
            {isDropDownToolbar && (
                <div className="dropdown-menutoolbar">
                    <div className="dropdown-itemtoolbar" onClick={() => { navigate('/why');setDropDownToolbar(!isDropDownToolbar)}}>WhyByteMentors?</div>
                    <div className="dropdown-itemtoolbar" onClick={() => { navigate('/about');setDropDownToolbar(!isDropDownToolbar)}}>About</div>
                    <div className="dropdown-itemtoolbar" onClick={() => { navigate('/learn');setDropDownToolbar(!isDropDownToolbar)}}>Learn</div>
                    <div className="dropdown-itemtoolbar" onClick={() => { navigate('/help');setDropDownToolbar(!isDropDownToolbar)}}>Help</div>
                </div>
            )}
        </div>
        <div className='col-3 d-none d-sm-block'>
            <Buttons/>
        </div>
        <div className='col-2 d-block d-sm-none display-login'>
            <FontAwesomeIcon icon={faRightToBracket} onClick={toggleLogin}/>
            {isDropDownLogin && (
                <div className="dropdown-menulogin">
                    <div className="dropdown-itemlogin" onClick={() => { navigate('/login');setDropDownToolbar(!isDropDownToolbar)}}>Login</div>
                    <div className="dropdown-itemlogin" onClick={() => { navigate('/login/option');setDropDownToolbar(!isDropDownToolbar)}}>Register</div>
                </div>
            )}
        </div>

    </header>
  )
}

export default Header