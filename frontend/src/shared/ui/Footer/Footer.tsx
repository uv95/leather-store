import { memo } from 'react';
import { Link } from 'react-router-dom';
import ig from '../../assets/icons/instagram-512.svg';
import { RoutePath } from '../../types/routePaths';
import './footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__container__top">
          <nav
            className="footer__container__top__nav"
            aria-label="Footer navigation"
          >
            <Link to={RoutePath.HOME}>Home</Link>
            <Link to={RoutePath.CATALOG}>Catalog</Link>
            <Link to={RoutePath.LEATHERS}>Types of leather</Link>
            <Link to={RoutePath.CONTACTS}>Contacts</Link>
          </nav>
          <div className="footer__container__top__social">
            <Link to="/">
              <img
                src={ig}
                alt="Instagram"
                className="footer__container__top__social--img"
              />
            </Link>
          </div>
        </div>
        {/* <div className="footer__container__bottom">
          <p>2022 All rights reserved</p>
        </div> */}
      </div>
    </footer>
  );
}

export default memo(Footer);
