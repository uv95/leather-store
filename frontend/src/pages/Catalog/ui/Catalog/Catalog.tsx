import { useEffect, useState } from 'react';
import {
  CatalogFilterDropdown,
  FilterList,
} from '../../../../features/CatalogFilter';
import { clearFilter } from '../../../../features/CatalogFilter/model/slice/filterSlice';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useGetItems } from '../../../../shared/lib/hooks/useGetItems';
import Pagination from '../../../../shared/ui/Pagination/Pagination';
import CatalogItemList from '../CatalogItemList/CatalogItemList';
import styles from './Catalog.module.scss';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { items } = useGetItems();
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
      <div className={styles.Catalog}>
        <div className={styles.container}>
          <div className={styles.dropdown}>
            <CatalogFilterDropdown />
          </div>
          <FilterList />
          <CatalogItemList
            items={items}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
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
