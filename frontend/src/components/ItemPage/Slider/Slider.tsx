import React, { useState } from 'react';
import './slider.scss';
import { ReactComponent as LeftArrow } from '../../../assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/right.svg';
import { ISlides } from '../Image/Image';

interface SliderProps {
  slides: ISlides[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <LeftArrow className="leftArrow" onClick={goToPrevious} />
      <RightArrow className="rightArrow" onClick={goToNext} />
      <div className="slider">
        {slides.map((slide, i) => (
          <img
            key={slide.name}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            src={slide.path}
            alt="Фото товара"
            className="slider-img"
          />
        ))}
      </div>
    </>
  );
};

export default Slider;
