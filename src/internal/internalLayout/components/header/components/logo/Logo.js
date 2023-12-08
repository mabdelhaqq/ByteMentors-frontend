import logo from '../../../../../../assets/images/logo.png'
import logodark from '../../../../../../assets/images/logodark.png'
import './Logo.scss'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../../../../helpers/ThemeContext';

const Logo = () => {
    const navigate = useNavigate();
    const { themeMode } = useTheme();
  
    const imageSource = themeMode === 'dark' ? logodark : logo;
  
    return (
      <img
        src={imageSource}
        alt="imglogo"
        className="img-logo"
        onClick={() => {
          navigate('/home');
        }}
      />
    );
  };
export default Logo