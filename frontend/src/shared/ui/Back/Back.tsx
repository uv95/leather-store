import { useNavigate } from 'react-router-dom';
import './back.scss';

type Props = {};

const Back = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="back" onClick={() => navigate(-1)}>
      Back
    </div>
  );
};

export default Back;
