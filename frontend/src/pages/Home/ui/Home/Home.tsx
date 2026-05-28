import { useEffect } from 'react';
import author from '../../../../shared/assets/img/about-me.jpg';
import banner from '../../../../shared/assets/img/bg-1.jpg';
import ItemsPreview from '../ItemsPreview/ItemsPreview';
import styles from './Home.module.scss';

const Home = () => {
  useEffect(() => {
    document.title = 'Leather Store | Home';
  }, []);

  return (
    <div className={styles.Home}>
      <div className={styles.banner} role="presentation">
        <img src={banner} alt="" />
      </div>
      <ItemsPreview />
      <section className={styles.about} aria-labelledby="about-heading">
        <div className={styles.aboutContainer}>
          <div className={styles.authorImage}>
            <img
              src={author}
              alt="Anne, the craftsperson behind Anne Leather"
            />
          </div>

          <div className={styles.aboutText}>
            <h2 id="about-heading">About me</h2>
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
      </section>
      <section
        className={styles.deliveryPayment}
        aria-labelledby="deliveryPayment-heading"
      >
        <div className={styles.deliveryPaymentContainer}>
          <h2 id="deliveryPayment-heading">Delivery and Payment</h2>
          <div>
            <p className={styles.delivery}>
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
            <p className={styles.payment}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              esse non aut, sint labore, unde dolore facere nobis veritatis
              adipisci odit quia in quo a modi eos saepe distinctio dolorum.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
