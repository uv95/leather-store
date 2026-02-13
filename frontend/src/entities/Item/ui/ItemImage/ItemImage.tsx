import React, { KeyboardEventHandler, useCallback, useState } from 'react';
import { ReactComponent as LeftArrow } from '../../../../shared/assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../../../../shared/assets/icons/right.svg';
import { Item } from '../..';
import styles from './ItemImage.module.scss';
import Button, { ButtonTheme } from '../../../../shared/ui/Button/Button';

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

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <div className={styles.ItemImage}>
      <Button
        className={styles.leftArrow}
        onClick={goToPrevious}
        theme={ButtonTheme.CLEAR}
        aria-label="Previous image"
        onKeyDown={onKeyDown}
      >
        <LeftArrow aria-hidden="true" />
      </Button>
      <Button
        className={styles.rightArrow}
        onClick={goToNext}
        theme={ButtonTheme.CLEAR}
        aria-label="Next image"
        onKeyDown={onKeyDown}
      >
        <RightArrow aria-hidden="true" />
      </Button>
      <div
        className={styles.slider}
        role="region"
        aria-roledescription="slides"
        aria-label="Product images"
      >
        {slides.map((slide, index) => (
          <img
            key={slide.name}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            src={slide.path}
            alt={'Product'}
            className={styles.sliderImage}
            aria-hidden={index !== currentIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemImage;
