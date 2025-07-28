import Button, { ButtonColor, ButtonSize } from '../Button/Button';
import './filterTag.scss';

interface FilterTagProps {
  onClick: () => void;
  filter: string;
}

const FilterTag = ({ onClick, filter }: FilterTagProps) => {
  return (
    <div className="filterTag">
      {filter}
      <Button
        square
        size={ButtonSize.S}
        color={ButtonColor.CLEAR}
        onClick={onClick}
      >
        &#9587;
      </Button>
    </div>
  );
};

export default FilterTag;
