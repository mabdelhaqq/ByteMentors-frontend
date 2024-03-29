import './MainPage.scss';
import rsm from '../../../assets/images/rsm.svg'

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="content col-12 col-md-8">
        <h1>Empowering Future Tech Leaders</h1>
        <p>Byte Mentor Mission</p>
      </div>
      <div className='img d-none d-md-block col-md-4'>
      <img src={rsm} alt="hello"/>
      </div>
    </div>
  );
};

export default MainPage;