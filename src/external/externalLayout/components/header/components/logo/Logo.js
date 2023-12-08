import logo from '../../../../../../assets/images/logo.png'
import './Logo.scss'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      src={logo}
      alt="imglogo"
      className='img-logo'
      onClick={() => {
        navigate('/')
      }}
    />
  )
}

export default Logo