import React from 'react';
import Button from '../Button/Button';
import './pagination.scss';

interface PaginationProps {
  currentPage: number;
  maxPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  currentPage,
  maxPages,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <nav aria-label="Pagination">
      <ol className="pagination">
        {Array.from({ length: maxPages }, (_, i) => i).map((number) => {
          const pageNumber = number + 1;
          const isActive = currentPage === pageNumber;

          return (
            <li key={number}>
              <Button
                isSquare
                className={`${
                  isActive
                    ? 'pagination-item pagination-item-active'
                    : 'pagination-item'
                }`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Pagination;
