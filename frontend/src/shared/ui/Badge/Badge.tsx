import './badge.scss';

type BadgeProps = { value: number; label?: string };

const Badge = ({ value, label }: BadgeProps) => {
  const ariaLabel = label ? `${value} ${label}` : undefined;

  return (
    <div className="badge" aria-label={ariaLabel}>
      {value}
    </div>
  );
};

export default Badge;
