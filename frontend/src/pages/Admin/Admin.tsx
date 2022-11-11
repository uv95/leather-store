import React from 'react';
import './admin.scss';
import Orders from '../../components/Admin/Orders/Orders';

type Props = {};

const Admin = (props: Props) => {
  return (
    <div className="admin">
      <Orders />
    </div>
  );
};

export default Admin;
