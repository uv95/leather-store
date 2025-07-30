import { ReactNode, useState } from 'react';
import Button from '../Button/Button';
import './dropdown.scss';
import ButtonRedesigned from '../Button/Button';

interface DropdownProps {
  children: ReactNode;
  buttonText: string;
}

const Dropdown = ({ children, buttonText }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <ButtonRedesigned onClick={() => setOpen(!open)}>
        {buttonText}
      </ButtonRedesigned>

      {open && (
        <>
          <div
            className="dropdown-container__background"
            onClick={() => setOpen(false)}
          ></div>
          <div className={`dropdown dropdown--${open ? 'open' : 'closed'}`}>
            <div className="dropdown__content">{children}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
