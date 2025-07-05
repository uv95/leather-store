import { ReactNode } from 'react';

interface DropdownSectionProps {
  title: string;
  children: ReactNode;
}

const DropdownSection = ({ title, children }: DropdownSectionProps) => {
  return (
    <div className="dropdown__content-section">
      <div className="dropdown__content-section-title">{title}</div>
      <div className="dropdown__content-section-options">{children}</div>
    </div>
  );
};

export default DropdownSection;
