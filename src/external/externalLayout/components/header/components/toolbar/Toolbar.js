import './Toolbar.scss'
import { Link } from 'react-router-dom'

const Toolbar = () => {
  return (
    <nav className='ex-nav'>
        <Link to='/why' className='link'><p className='item'>whyByteMentors?</p></Link>
        <Link to='/about' className='link'><p className='item'>About</p></Link>
        <Link to='/learn'className='link'><p className='item'>Learn</p></Link>
        <Link to='/help' className='link'><p className='item'>Help</p></Link>
    </nav>
  )
}

export default Toolbar