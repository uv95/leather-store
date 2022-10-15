import React from 'react';
import './image.scss';
import Slider from './Slider';
import wallet1 from '../../../assets/img/wallet-1.jpg';
import wallet2 from '../../../assets/img/wallet-2.jpg';
import wallet3 from '../../../assets/img/wallet-3.jpg';

export interface ISlides {
  url: string;
  title: string;
}

const Image = () => {
  const slides: ISlides[] = [
    { url: wallet1, title: 'wallet' },
    { url: wallet2, title: 'wallet' },
    { url: wallet3, title: 'wallet' },
  ];
  return (
    <>
      <div className="image">
        <Slider slides={slides} />
      </div>
    </>
  );
};

export default Image;
