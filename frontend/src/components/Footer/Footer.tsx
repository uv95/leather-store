import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import { HOME_ROUTE, CATALOG_ROUTE, CONTACTS_ROUTE } from '../../utils/consts';
import ig from '../../assets/icons/instagram-512.svg';

type Props = {};

function Footer({}: Props) {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container__top">
          <nav className="footer__container__top__nav">
            <Link to={HOME_ROUTE}>Главная</Link>
            <Link to={CATALOG_ROUTE}>Каталог</Link>
            <Link to={CONTACTS_ROUTE}>Контакты</Link>
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
          {' '}
          <p>2022 Все права защищены</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
