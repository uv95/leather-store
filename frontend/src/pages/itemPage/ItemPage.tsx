import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Description from '../../components/ItemPage/Description/Description';
import Image from '../../components/ItemPage/Image/Image';
import { getItem } from '../../entities/Item/model/selectors/getItem/getItem';
import { getItemsIsLoading } from '../../entities/Item/model/selectors/getItemsIsLoading/getItemsIsLoading';
import { getItemBySlug } from '../../entities/Item/model/services/getItemBySlug/getItemBySlug';
import { useAppDispatch } from '../../hooks';
import toast from '../../shared/lib/toast/toast';
import Back from '../../shared/ui/Back/Back';
import Spinner from '../../shared/ui/Spinner/Spinner';
import './itemPage.scss';

const ItemPage = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const item = useSelector(getItem);
  const isLoading = useSelector(getItemsIsLoading);

  useEffect(() => {
    if (slug) {
      dispatch(getItemBySlug(slug))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, slug]);

  if (isLoading) {
    return (
      <div className="item">
        <Back />
        <div className="item__container">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="item">
      <Back />
      <div className="item__container">
        <div className="item__container__left">
          {item && <Image item={item} />}
        </div>
        <div className="item__container__right">
          {item && <Description item={item} />}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
