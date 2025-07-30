import Button, { ButtonTheme, ButtonSize } from '../Button/Button';
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
        isSquare
        size={ButtonSize.S}
        theme={ButtonTheme.CLEAR}
        onClick={onClick}
      >
        &#9587;
      </Button>
    </div>
  );
};

export default FilterTag;
