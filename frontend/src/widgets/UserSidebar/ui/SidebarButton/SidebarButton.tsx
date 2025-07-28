import './sidebarButton.scss';

interface SidebarButtonProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
  icon: string;
}

const SidebarButton = ({ text, onClick, isActive, icon }: SidebarButtonProps) => {
  return (
    <div onClick={onClick} className={`sidebarButton ${isActive ? 'sidebarButton--active' : ''}`}>
      <div className="sidebarButton-icon">
        <img src={icon} alt={text} />
      </div>
      <div className="sidebarButton-text">{text}</div>
    </div>
  );
};

export default SidebarButton;
