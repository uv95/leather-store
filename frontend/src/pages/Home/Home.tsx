import React from 'react';
import './home.scss';
import Banner from '../../components/Home/Banner/Banner';
import HomeItems from '../../components/Home/HomeItems/HomeItems';
import About from '../../components/Home/About/About';
import PaymentDelivery from '../../components/Home/PaymentDelivery/PaymentDelivery';

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
