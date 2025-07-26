import { Link } from 'react-router-dom';
import ig from '../../shared/assets/icons/instagram-512.svg';
import './footer.scss';
import { memo } from 'react';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container__top">
          <nav className="footer__container__top__nav">
            <Link to={RoutePath.HOME}>Home</Link>
            <Link to={RoutePath.CATALOG}>Catalog</Link>
            <Link to={RoutePath.LEATHERS}>Types of leather</Link>
            <Link to={RoutePath.CONTACTS}>Contacts</Link>
          </nav>
          <div className="footer__container__top__social">
            <Link to="/">
              <img
                src={ig}
                alt=""
                className="footer__container__top__social--img"
              />
            </Link>
          </div>
        </div>
        <div className="footer__container__bottom">
          <p>2022 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
