import author from '../../shared/assets/img/about-me.jpg';
import banner from '../../shared/assets/img/bg-1.jpg';
import { ItemsPreview } from '../../widgets/ItemsPreview';
import './home.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <img src={banner} alt="banner" className="banner__img" />
      </div>
      <ItemsPreview />
      <div className="about">
        <div className="about__container">
          <div className="about__container__img">
            <img src={author} alt="author" />
          </div>

          <div className="about__container__text">
            <h3>About me</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              quasi harum! Maiores nisi sequi corporis ab voluptatibus vel
              officiis amet saepe. Obcaecati nemo veritatis nihil reprehenderit
              cupiditate, reiciendis similique ea. Illo at optio necessitatibus
              odio, iusto dolore porro, aut hic illum voluptates incidunt
              sapiente! ipsum dolor sit amet consectetur adipisicing elit. Iure,
              quasi harum! Maiores nisi sequi corporis ab voluptatibus vel
              officiis amet saepe. Obcaecati nemo veritatis nihil reprehenderit
              cupiditate, reiciendis similique ea. Illo at optio necessitatibus
              odio, iusto dolore porro, aut hic illum voluptates incidunt
              sapiente!
            </p>
          </div>
        </div>
      </div>
      <div className="pd">
        <div className="pd__container">
          <h4 className="pd__container__heading">Delivery and Payment</h4>
          <div className="pd__container__text">
            <p className="pd__container__text--delivery">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis, nihil natus amet debitis ratione reiciendis accusantium
              corporis dolorum minus id deleniti quasi beatae odio nemo earum.
              Quos ullam magni ab. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis, nihil natus amet debitis ratione
              reiciendis accusantium corporis dolorum minus id deleniti quasi
              beatae odio nemo earum. Quos ullam magni ab. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Veritatis, nihil natus amet
              debitis ratione reiciendis accusantium corporis dolorum minus id
              deleniti quasi beatae odio nemo earum. Quos ullam magni ab.
            </p>
            <p className="pd__container__text--payment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              esse non aut, sint labore, unde dolore facere nobis veritatis
              adipisci odit quia in quo a modi eos saepe distinctio dolorum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
