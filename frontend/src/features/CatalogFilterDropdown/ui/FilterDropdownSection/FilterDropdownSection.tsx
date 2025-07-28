import { ReactNode } from 'react';
import './filterDropdownSection.scss';

interface FilterDropdownSectionProps {
  title: string;
  children: ReactNode;
}

const FilterDropdownSection = ({
  title,
  children,
}: FilterDropdownSectionProps) => {
  return (
    <div className="filterDropdownSection">
      <div className="filterDropdownSection-title">{title}</div>
      <div className="filterDropdownSection-content">{children}</div>
    </div>
  );
};

export default FilterDropdownSection;
