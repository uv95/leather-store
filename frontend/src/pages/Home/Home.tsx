import React from 'react';
import './home.scss';
import Banner from '../../components/Banner/Banner';
import HomeItems from '../../components/HomeItems/HomeItems';
import About from '../../components/About/About';
import PaymentDelivery from '../../components/PaymentDelivery/PaymentDelivery';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home">
      <Banner />
      <HomeItems />
      <About />
      <PaymentDelivery />
    </div>
  );
};

export default Home;
