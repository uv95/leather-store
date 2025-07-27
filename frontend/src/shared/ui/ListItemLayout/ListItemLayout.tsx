import { memo, ReactElement, ReactNode, useState } from 'react';
import arrow from '../../../shared/assets/icons/right.svg';
import './listItemLayout.scss';

export enum ListItemTheme {
  WHITE = 'white',
  GREY = 'grey'
}

type ListItemLayoutProps = {
  children: ReactNode;
  Details: ReactElement;
  theme?: ListItemTheme;
};

const ListItemLayout = (props: ListItemLayoutProps) => {
  const { children, Details, theme = ListItemTheme.GREY } = props;
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className="listItem">
      <div className={`listItem__card listItem__card--${theme}`}>
       {children}
        <div className={`listItem__card__arrow listItem__card__arrow--${theme}`}>
          <img
            className={`listItem__card-icon listItem__card-icon--${
              openDetails ? 'open' : 'closed'
            }`}
            src={arrow}
            alt="open"
            onClick={() => setOpenDetails(!openDetails)}
          />
        </div>
      </div>
      <div
        className={`listItem__details listItem__details--${
          openDetails ? 'open' : 'closed'
        }`}
      >
        {Details}
      </div>
    </div>
  );
};

export default memo(ListItemLayout);
