import React, { useState } from 'react';
import './listItem.scss';
import arrow from '../../../assets/icons/right.svg';

type ListItemProps = {
  data: { dataItem: any; style?: string }[];
  bg: string;
  Details: JSX.Element;
};

const ListItem = ({ data, bg, Details }: ListItemProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div className="listItem">
      <div className={`listItem__card listItem__card--${bg}`}>
        {data.map((el, i) => (
          <div key={i} className="listItem__card__field">
            <div
              className={`listItem__card__field-content ${
                el.style ? el.style : ''
              }`}
            >
              {el.dataItem}
            </div>
          </div>
        ))}
        <div className={`listItem__card--${bg}__openDetails`}>
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

export default ListItem;
