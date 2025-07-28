import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import './myInfo.scss';

const MyInfo = () => {
  return (
    <>
      <h1 className="info-title">My Info</h1>
      <PersonalInfoForm />
      <PasswordChangeForm />
    </>
  );
};

export default MyInfo;
