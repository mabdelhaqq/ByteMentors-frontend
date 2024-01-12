import './Toolbar.scss'
import { Link } from 'react-router-dom'

const Toolbar = () => {
  return (
    <nav className='ex-nav'>
        <p className='item'><Link to='/why' className='link'>whyByteMentor?</Link></p>
        <p className='item'><Link to='/about' className='link'>About</Link></p>
        <p className='item'><Link to='/learn' className='link'>Learn</Link></p>
        <p className='item'><Link to='/help' className='link'>Help</Link></p>
    </nav>
  )
}

export default Toolbar