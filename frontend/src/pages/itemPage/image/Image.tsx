import React from 'react';
import './image.scss';
import Slider from './Slider';
import { ItemData } from '../../../features/items/itemsService';

interface ImageProps {
  item: ItemData;
}
export interface ISlides {
  path: any;
  name: string;
}

const Image: React.FC<ImageProps> = ({ item }) => {
  const allItemImages = [item.imageCover, ...item.images];

  const slides: ISlides[] = allItemImages.map((img) => ({
    path: require(`../../../assets/img/items/${img}`),
    name: img,
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
