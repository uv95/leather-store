import React from 'react';
import './about.scss';
import anna from '../../assets/img/anna.jpg';

type Props = {};

const About = (props: Props) => {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__container__img">
          <img src={anna} alt="" className="about__container__img--item" />
        </div>

        <div className="about__container__text">
          <h4>Обо мне</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, quasi
            harum! Maiores nisi sequi corporis ab voluptatibus vel officiis amet
            saepe. Obcaecati nemo veritatis nihil reprehenderit cupiditate,
            reiciendis similique ea. Illo at optio necessitatibus odio, iusto
            dolore porro, aut hic illum voluptates incidunt sapiente! ipsum
            dolor sit amet consectetur adipisicing elit. Iure, quasi harum!
            Maiores nisi sequi corporis ab voluptatibus vel officiis amet saepe.
            Obcaecati nemo veritatis nihil reprehenderit cupiditate, reiciendis
            similique ea. Illo at optio necessitatibus odio, iusto dolore porro,
            aut hic illum voluptates incidunt sapiente!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
