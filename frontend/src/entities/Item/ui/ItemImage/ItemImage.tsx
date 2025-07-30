import React, { useCallback, useState } from 'react';
import { ReactComponent as LeftArrow } from '../../../../shared/assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../../../../shared/assets/icons/right.svg';
import { Item } from '../..';
import styles from './ItemImage.module.scss';

interface ItemImageProps {
  item: Item;
}
interface Slide {
  path: string;
  name: string;
}

const ItemImage: React.FC<ItemImageProps> = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const allItemImages = [item.imageCover, ...item.images];

  const slides: Slide[] = allItemImages.map((img) => ({
    path: img.url,
    name: img.url,
  }));

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  return (
    <div className={styles.ItemImage}>
      <LeftArrow className={styles.leftArrow} onClick={goToPrevious} />
      <RightArrow className={styles.rightArrow} onClick={goToNext} />
      <div className={styles.slider}>
        {slides.map((slide) => (
          <img
            key={slide.name}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            src={slide.path}
            alt={'Product'}
            className={styles.sliderImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemImage;
