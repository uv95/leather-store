import styles from './FilterDropdownButton.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';

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
      className={classNames(
        styles.FilterDropdownButton,
        { [styles.isSelected]: isSelected },
        [],
      )}
    >
      {text}
    </button>
  );
};

export default FilterDropdownButton;
