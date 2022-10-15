import React from 'react';
import './paymentDelivery.scss';

type Props = {};

const PaymentDelivery = (props: Props) => {
  return (
    <div className="pd">
      <div className="pd__container">
        <h4 className="pd__container__heading">Доставка и оплата</h4>
        <div className="pd__container__text">
          <p className="pd__container__text--delivery">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
            nihil natus amet debitis ratione reiciendis accusantium corporis
            dolorum minus id deleniti quasi beatae odio nemo earum. Quos ullam
            magni ab. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Veritatis, nihil natus amet debitis ratione reiciendis accusantium
            corporis dolorum minus id deleniti quasi beatae odio nemo earum.
            Quos ullam magni ab. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Veritatis, nihil natus amet debitis ratione
            reiciendis accusantium corporis dolorum minus id deleniti quasi
            beatae odio nemo earum. Quos ullam magni ab.
          </p>
          <p className="pd__container__text--payment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi esse
            non aut, sint labore, unde dolore facere nobis veritatis adipisci
            odit quia in quo a modi eos saepe distinctio dolorum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDelivery;
