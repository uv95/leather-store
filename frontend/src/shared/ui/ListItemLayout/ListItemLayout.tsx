import { memo, ReactElement, ReactNode, useState } from 'react';
import { ReactComponent as Arrow } from '../../../shared/assets/icons/right.svg';
import styles from './ListItemLayout.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum ListItemTheme {
  WHITE = 'white',
  GREY = 'grey',
}

type ListItemLayoutProps = {
  children: ReactNode;
  Details: ReactElement;
  theme?: ListItemTheme;
  className?: string;
};

const ListItemLayout = (props: ListItemLayoutProps) => {
  const { children, className, Details, theme = ListItemTheme.GREY } = props;
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className={classNames(styles.ListItemLayout, {}, [className])}>
      <div className={classNames(styles.card, {}, [styles[theme]])}>
        {children}
        <div className={styles.iconContainer}>
          <Arrow
            className={classNames(
              styles.icon,
              { [styles.iconOpen]: openDetails },
              []
            )}
            onClick={() => setOpenDetails(!openDetails)}
          />
        </div>
      </div>
      <div
        className={classNames(
          styles.details,
          { [styles.detailsOpen]: openDetails },
          []
        )}
      >
        {Details}
      </div>
    </div>
  );
};

export default memo(ListItemLayout);
