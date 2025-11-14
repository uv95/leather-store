import { useNavigate } from 'react-router-dom';
import './back.scss';

const Back = () => {
  const navigate = useNavigate();

  return (
    <button type="button" className="back" onClick={() => navigate(-1)}>
      Back
    </button>
  );
};

export default Back;
