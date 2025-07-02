import React, { useState } from 'react';
import './listItem.scss';
import arrow from '../../../assets/icons/right.svg';

type ListItemProps = {
  data: { dataItem: any; style?: string }[];
  bg: string;
  Details: JSX.Element;
  myOrder?: boolean;
};

const ListItem = ({ data, bg, Details, myOrder }: ListItemProps) => {
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
          }  ${myOrder ? 'myOrder' : ''}`}
          style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}
        >
          {data.map((el, i) => (
            <div
              key={i}
              className={`listItem__card__main__field ${
                myOrder ? 'myOrder' : ''
              }`}
            >
              <div
                className={`listItem__card__main__field-content ${
                  el.style ? el.style : ''
                }  ${myOrder ? 'myOrder' : ''}`}
              >
                {el.dataItem?.imgPath ? (
                  <img
                    src={el.dataItem?.imgPath}
                    alt={el.dataItem?.name || 'Product'}
                  />
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
