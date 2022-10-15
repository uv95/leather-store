import React from 'react';
import './table.scss';
import wallet from '../../assets/img/wallet-2.jpg';
import { ReactComponent as Delete } from '../../assets/icons/trash.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';

type Props = {};

const Table = (props: Props) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Изображение</th>
            <th>Название</th>
            <th>Тип товара</th>
            <th>Цена</th>
            <th>Куплено</th>
            <th>Добавлено</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-num">1</td>
            <td className="table-img">
              <img src={wallet} alt="" />
            </td>
            <td className="table-title">Wallet Crazy Horse</td>
            <td className="table-type">Кошельки и картхолдеры</td>
            <td className="table-price">$20</td>
            <td className="table-bought">3</td>
            <td className="table-added">6.06.2022</td>
            <td className="table-actions">
              <div className="table-actions__container">
                <Edit />
                <Delete />
              </div>
            </td>
          </tr>
          <tr>
            <td className="table-num">1</td>
            <td className="table-img">
              <img src={wallet} alt="" />
            </td>
            <td className="table-title">Wallet Crazy Horse</td>
            <td className="table-type">Кошельки и картхолдеры</td>
            <td className="table-price">$20</td>
            <td className="table-bought">3</td>
            <td className="table-added">6.06.2022</td>
            <td className="table-actions">
              <div className="table-actions__container">
                <Edit />
                <Delete />
              </div>
            </td>
          </tr>
          <tr>
            <td className="table-num">1</td>
            <td className="table-img">
              <img src={wallet} alt="" />
            </td>
            <td className="table-title">
              Wallet Crazy Horsesfddfs dfsfdsfsdfdfds
            </td>
            <td className="table-type">Кошельки и картхолдеры</td>
            <td className="table-price">$20</td>
            <td className="table-bought">3</td>
            <td className="table-added">6.06.2022</td>
            <td className="table-actions">
              <div className="table-actions__container">
                <Edit />
                <Delete />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
