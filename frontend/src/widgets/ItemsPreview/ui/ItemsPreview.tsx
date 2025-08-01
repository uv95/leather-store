import { Link } from 'react-router-dom';
import { useGetAllItems } from '../../../shared/lib/hooks/useGetAllItems';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import ItemCard from '../../../shared/ui/ItemCard/ItemCard';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import './itemsPreview.scss';

const ItemsPreview = () => {
  const { isLoading, items } = useGetAllItems();

  return (
    <div className="items-preview">
      <div className="items-preview__heading">
        <h4>Store</h4>
        <Link to={RoutePath.CATALOG} className="items-preview__heading-link">
          View all
        </Link>
      </div>
      <div className="items-preview__container">
        {isLoading && <Spinner />}
        {!isLoading &&
          items
            ?.slice(0, 4)
            .map((item) => <ItemCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default ItemsPreview;
