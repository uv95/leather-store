import { KeyboardEvent, ReactNode, useState } from 'react';
import Button from '../Button/Button';
import './dropdown.scss';

interface DropdownProps {
  children: ReactNode;
  buttonText: string;
}

const Dropdown = ({ children, buttonText }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      setIsOpen(false);
    }
  };

  return (
    <div className="dropdown-container" onKeyDown={handleKeyDown}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {buttonText}
      </Button>

      {isOpen && (
        <>
          <div
            className="dropdown-container__background"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className={`dropdown dropdown--${isOpen ? 'open' : 'closed'}`}>
            <div className="dropdown__content">{children}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
