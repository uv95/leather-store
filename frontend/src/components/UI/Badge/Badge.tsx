import React from 'react';
import './badge.scss';

type BadgeProps = { value: number };

const Badge = ({ value }: BadgeProps) => {
  return <div className="badge">{value}</div>;
};

export default Badge;
