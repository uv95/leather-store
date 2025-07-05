import bg from '../../../assets/img/bg-1.jpg';
import './banner.scss';

const Banner = () => {
  return (
    <div className="banner">
      <img src={bg} alt="banner" className="banner__img" />
    </div>
  );
};

export default Banner;
