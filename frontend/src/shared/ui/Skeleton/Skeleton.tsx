import { useCallback } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: number;
  height?: number;
  className?: string;
  [key: string]: any;
}

interface Dimensions {
  width?: string;
  height?: string;
}

const Skeleton = ({ width, height, className, ...rest }: SkeletonProps) => {
  const getStyles = useCallback(() => {
    const styles: Dimensions = {};

    if (width) {
      styles.width = `${width}rem`;
    }
    if (height) {
      styles.height = `${height}rem`;
    }

    return styles;
  }, [width, height]);

  return (
    <div
      className={classNames(styles.Skeleton, {}, [className])}
      style={getStyles()}
      {...rest}
    ></div>
  );
};

export default Skeleton;
