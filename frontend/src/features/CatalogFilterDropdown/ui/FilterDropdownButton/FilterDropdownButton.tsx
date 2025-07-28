import './filterDropdownButton.scss';

interface FilterDropdownButtonProps {
  onClick: () => void;
  isSelected: boolean;
  text: string;
}

const FilterDropdownButton = ({
  onClick,
  isSelected,
  text,
}: FilterDropdownButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`filterDropdownButton ${
        isSelected ? 'filterDropdownButton--selected' : ''
      }`}
    >
      {text}
    </button>
  );
};

export default FilterDropdownButton;
