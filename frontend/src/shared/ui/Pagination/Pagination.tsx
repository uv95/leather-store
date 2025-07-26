import React from 'react';
import './pagination.scss';

type Props = {
  currentPage: number;
  maxPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ currentPage, maxPages, setCurrentPage }: Props) => {
  return (
    <div className="pagination">
      {Array.from({ length: maxPages }, (_, i) => i).map((number) => (
        <div
          key={number}
          className={`${
            currentPage === number + 1
              ? 'pagination-item pagination-item-active'
              : 'pagination-item'
          }`}
          onClick={() => setCurrentPage(number + 1)}
        >
          {number + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
