import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Item } from '../../entities/Item';
import {
  CatalogFilterDropdown,
  FilterList,
  getSortBy,
  SortingOptions,
} from '../../features/CatalogFilter';
import { clearFilter } from '../../features/CatalogFilter/model/slice/filterSlice';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';
import { useGetAllItems } from '../../shared/lib/hooks/useGetAllItems';
import ItemCard from '../../shared/ui/ItemCard/ItemCard';
import Pagination from '../../shared/ui/Pagination/Pagination';
import Spinner from '../../shared/ui/Spinner/Spinner';
import './catalog.scss';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const sortBy = useSelector(getSortBy);
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
          <FilterList />
          {isLoading ? (
            <Spinner />
          ) : (
            <CatalogItems
              items={items}
              sortBy={sortBy}
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
  sortBy: SortingOptions;
  itemsPerPage: number;
  currentPage: number;
}) {
  const { items, sortBy, itemsPerPage, currentPage } = props;

  if (!items.length) {
    return <p className="catalog__container__items-empty">No items found</p>;
  }

  return (
    <div className="catalog__container__items">
      {sortBy === SortingOptions.DEFAULT
        ? items
            .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
            .map((item) => <ItemCard key={item._id} item={item} />)
        : [...items]
            .sort((a, b) => {
              if (+a.price === +b.price) return 0;
              return sortBy === SortingOptions.PRICE_DESCENDING
                ? +b.price - +a.price
                : +a.price - +b.price;
            })
            .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
            .map((item) => <ItemCard key={item._id} item={item} />)}
    </div>
  );
}
