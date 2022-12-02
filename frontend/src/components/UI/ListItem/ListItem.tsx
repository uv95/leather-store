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
        <div
          //to place image without padding
          className={`${
            data[0].dataItem.imgPath
              ? 'listItem__card__main listItem__card__main-withImage'
              : 'listItem__card__main listItem__card__main'
          }`}
          style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}
        >
          {data.map((el, i) => (
            <div key={i} className="listItem__card__main__field">
              <div
                className={`listItem__card__main__field-content ${
                  el.style ? el.style : ''
                }`}
              >
                {el.dataItem?.imgPath ? (
                  <img src={el.dataItem?.imgPath} alt="фото товара" />
                ) : (
                  el.dataItem
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={`listItem__card__arrow listItem__card__arrow--${bg}`}>
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
