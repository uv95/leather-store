import { useAppSelector, useAppDispatch } from '../../../hooks';
import { removeFilter, setSort } from '../../../features/filters/filtersSlice';
import { SortingOptions } from '../../../types/data';
import './filtersPanel.scss';

const FiltersPanel = () => {
  const { filters, sort } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <div className="filtersPanel">
      {(sort === SortingOptions.DEFAULT ? filters : [...filters, sort]).map(
        (filter) => (
          <div className="filtersPanel__item" key={filter}>
            <div className="filtersPanel__item-cell">
              {filter}
              <span
                onClick={() => {
                  filter === SortingOptions.PRICE_ASCENDING ||
                  filter === SortingOptions.PRICE_DESCENDING
                    ? dispatch(setSort(SortingOptions.DEFAULT))
                    : dispatch(removeFilter(filter));
                }}
              >
                &#9587;
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FiltersPanel;
