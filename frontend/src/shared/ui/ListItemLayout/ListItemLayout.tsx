import { memo, ReactElement, ReactNode, useState } from 'react';
import { ReactComponent as Arrow } from '../../../shared/assets/icons/right.svg';
import styles from './ListItemLayout.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import Button, { ButtonTheme } from '../Button/Button';

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className={classNames(styles.ListItemLayout, {}, [className])}>
      <div className={classNames(styles.card, {}, [styles[theme]])}>
        {children}
        <Button
          className={styles.iconContainer}
          theme={ButtonTheme.CLEAR}
          aria-expanded={isDetailsOpen}
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        >
          <Arrow
            className={classNames(
              styles.icon,
              { [styles.iconOpen]: isDetailsOpen },
              []
            )}
            aria-hidden="true"
          />
        </Button>
      </div>
      <div
        className={classNames(
          styles.details,
          { [styles.detailsOpen]: isDetailsOpen },
          []
        )}
        aria-hidden={!isDetailsOpen}
      >
        {Details}
      </div>
    </div>
  );
};

export default memo(ListItemLayout);
