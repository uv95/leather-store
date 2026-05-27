import './badge.scss';

type BadgeProps = { value: number; label?: string };

const Badge = ({ value, label }: BadgeProps) => {
  const ariaLabel = label ? `${value} ${label}` : `${value}`;

  return (
    <div className="badge" aria-label={ariaLabel} aria-atomic="true">
      {value}
    </div>
  );
};

export default Badge;
