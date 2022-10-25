import React, { useEffect } from 'react';
import './table.scss';
import { ReactComponent as Delete } from '../../assets/icons/trash.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteItem, getAllItems } from '../../features/items/itemsSlice';

const Table = () => {
  const dispatch = useAppDispatch();

  const { isLoading, items } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(getAllItems())
      .unwrap()
      .then((data) => console.log(data, 'data'))
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  const onDelete = (id: string) => {
    dispatch(deleteItem(id))
      .unwrap()
      .then((data) => console.log(data, 'data'))
      .catch((error) => console.log(error, 'ERROR'));
  };

  useEffect(() => {
    console.log(isLoading, 'isLoading');
  }, [isLoading]);

  if (isLoading) return <h1>LOADING</h1>;

  if (items.length === 0) return <h1>Товаров не найдено</h1>;

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
            <th>Добавлено</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item._id}>
              <td className="table-num">{i + 1}</td>
              <td className="table-img">
                <img
                  src={require(`../../assets/img/items/${item.imageCover}`)}
                  alt="Фото товара"
                />
              </td>
              <td className="table-title">{item.name}</td>
              <td className="table-type">
                {item.type.split('')[0].toUpperCase() + item.type.slice(1)}
              </td>
              <td className="table-price">{item.price} руб</td>
              <td className="table-added">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="table-actions">
                <div className="table-actions__container">
                  <Edit />
                  <Delete onClick={() => onDelete(item._id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
