import { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'shared/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <Pagination
        maxPages={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  },
};
