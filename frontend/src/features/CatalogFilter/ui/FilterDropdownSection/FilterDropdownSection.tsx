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
  const sectionId = `filter-section-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      className="filterDropdownSection"
      role="group"
      aria-labelledby={sectionId}
    >
      <div
        className="filterDropdownSection-title"
        id={sectionId}
        role="presentation"
      >
        {title}
      </div>
      <div className="filterDropdownSection-content">{children}</div>
    </div>
  );
};

export default FilterDropdownSection;
