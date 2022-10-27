import React from 'react';
import './userProfile.scss';

type Props = {};

const UserProfile = (props: Props) => {
  return (
    <div className="profile">
      <div className="profile__heading">Личный кабинет</div>
      <div className="profile__container">
        <div className="profile__container__nav"></div>
        <div className="profile__container__content"></div>
      </div>
    </div>
  );
};

export default UserProfile;
