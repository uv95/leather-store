import { Link } from 'react-router-dom';
import ig from '../../assets/icons/instagram-512.svg';
import {
  CATALOG_ROUTE,
  CONTACTS_ROUTE,
  HOME_ROUTE,
  LEATHERS_ROUTE,
} from '../../utils/consts';
import './footer.scss';
import { memo } from 'react';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container__top">
          <nav className="footer__container__top__nav">
            <Link to={HOME_ROUTE}>Home</Link>
            <Link to={CATALOG_ROUTE}>Catalog</Link>
            <Link to={LEATHERS_ROUTE}>Types of leather</Link>
            <Link to={CONTACTS_ROUTE}>Contacts</Link>
          </nav>
          <div className="footer__container__top__social">
            {/* todo: IG link */}
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
