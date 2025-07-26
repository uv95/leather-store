import { Link } from 'react-router-dom';
import { useGetAllItems } from '../../../hooks/useGetAllItems';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import ItemCard from '../../../shared/ui/ItemCard/ItemCard';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import './homeItems.scss';

const HomeItems = () => {
  const { isLoading, items } = useGetAllItems();

  return (
    <div className="home-items">
      <div className="home-items__heading">
        <h4>Store</h4>
        <Link to={RoutePath.CATALOG} className="home-items__heading-link">
          View all
        </Link>
      </div>
      <div className="home-items__container">
        {isLoading && <Spinner />}
        {!isLoading &&
          items
            ?.slice(0, 4)
            .map((item) => <ItemCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default HomeItems;
