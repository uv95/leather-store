import React from 'react';
import './image.scss';
import Slider from '../Slider/Slider';
import { IItem } from '../../../types/data';

interface ImageProps {
  item: IItem;
}
export interface ISlides {
  path: any;
  name: string;
}

const Image: React.FC<ImageProps> = ({ item }) => {
  const allItemImages = [item.imageCover, ...item.images];

  const slides: ISlides[] = allItemImages.map((img) => ({
    path: img.url,
    name: img.url,
  }));

  return (
    <>
      <div className="image">
        <Slider slides={slides} />
      </div>
    </>
  );
};

export default Image;
