import React from 'react';
import './tab.scss';

interface TabProps {
  text: string;
  onClick: () => void;
  active: boolean;
  icon: string;
}

const Tab: React.FC<TabProps> = ({ text, onClick, active, icon }) => {
  return (
    <div onClick={onClick} className={`tab ${active ? 'active' : ''}`}>
      <div className="tab-icon">
        <img src={icon} alt="icon" />
      </div>
      <div className="tab-text">{text}</div>
    </div>
  );
};

export default Tab;
