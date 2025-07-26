import React from 'react';
import './itemPage.scss';
import Image from '../../components/ItemPage/Image/Image';
import Description from '../../components/ItemPage/Description/Description';
import { useGetItem } from '../../hooks/useGetItem';
import Back from '../../shared/ui/Back/Back';
import Spinner from '../../shared/ui/Spinner/Spinner';

const ItemPage = () => {
  const { item, isLoading } = useGetItem();

  return (
    <div className="item">
      <Back />
      <div className="item__container">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="item__container__left">
              {item && <Image item={item} />}
            </div>
            <div className="item__container__right">
              {item && <Description item={item} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
