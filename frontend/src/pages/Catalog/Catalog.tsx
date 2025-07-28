import { useEffect, useState } from 'react';
import FiltersPanel from '../../components/Catalog/FiltersPanel/FiltersPanel';
import { Item } from '../../entities/Item/model/types/item';
import { CatalogFilterDropdown } from '../../features/CatalogFilterDropdown';
import { clearFilter } from '../../features/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetAllItems } from '../../hooks/useGetAllItems';
import ItemCard from '../../shared/ui/ItemCard/ItemCard';
import Pagination from '../../shared/ui/Pagination/Pagination';
import Spinner from '../../shared/ui/Spinner/Spinner';
import './catalog.scss';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.filters);
  const { isLoading, items } = useGetAllItems();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    setMaxPages(
      items.length !== 0 ? Math.ceil(items.length / itemsPerPage) : 1
    );
  }, [items, itemsPerPage]);

  useEffect(() => {
    return () => {
      dispatch(clearFilter());
    };
  }, [dispatch]);

  return (
    <>
      <div className="catalog">
        <div className="catalog__container">
          <div className="catalog__container__top">
            <CatalogFilterDropdown />
          </div>
          <FiltersPanel />
          {isLoading ? (
            <Spinner />
          ) : (
            <CatalogItems
              items={items}
              sort={sort}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
            />
          )}
        </div>
        {items.length ? (
          <Pagination
            maxPages={maxPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </div>
    </>
  );
};

export default Catalog;

function CatalogItems(props: {
  items: Item[];
  sort: string;
  itemsPerPage: number;
  currentPage: number;
}) {
  const { items, sort, itemsPerPage, currentPage } = props;

  if (!items.length) {
    return <p className="catalog__container__items-empty">No items found</p>;
  }

  return (
    <div className="catalog__container__items">
      {sort === 'Default'
        ? items
            .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
            .map((item) => <ItemCard key={item._id} item={item} />)
        : [...items]
            .sort((a, b) => {
              if (+a.price === +b.price) return 0;
              return sort === 'Price descending'
                ? +b.price - +a.price
                : +a.price - +b.price;
            })
            .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
            .map((item) => <ItemCard key={item._id} item={item} />)}
    </div>
  );
}
