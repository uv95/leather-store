import React from 'react';
import './contacts.scss';

type Props = {};

const Contacts = (props: Props) => {
  return (
    <div className="contacts">
      <div className="contacts__container">
        <h1 className="contacts__container-heading">Контакты</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
          maxime dolore molestiae debitis dolorem quos nemo harum, adipisci
          veniam nulla quaerat libero natus eos esse. Nesciunt minus sit
          molestias nemo!
        </p>
      </div>
    </div>
  );
};

export default Contacts;
