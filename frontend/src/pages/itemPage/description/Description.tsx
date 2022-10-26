import React, { useState } from 'react';
import './description.scss';
import black from '../../../assets/img/black.jpg';
import Button from '../../../components/Button/Button';
import ChooseColor from '../../../components/ChooseColor/ChooseColor';
import { ItemData } from '../../../features/items/itemsService';

interface DescriptionProps {
  item: ItemData;
}

const Description: React.FC<DescriptionProps> = ({ item }) => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [openChooseLeatherColor, setOpenChooseLeatherColor] = useState(false);
  const [openChooseThreadsColor, setOpenChooseThreadsColor] = useState(false);

  const chooseLeatherColor = () => {
    setOpenChooseLeatherColor(true);
  };
  const chooseThreadsColor = () => {
    setOpenChooseThreadsColor(true);
  };
  return (
    <>
      {openChooseLeatherColor && (
        <ChooseColor
          setOpenChooseColor={setOpenChooseLeatherColor}
          title="Выберите цвет кожи"
        />
      )}
      {openChooseThreadsColor && (
        <ChooseColor
          setOpenChooseColor={setOpenChooseThreadsColor}
          title="Выберите цвет ниток"
        />
      )}
      <h1 className="item-title">{item.name}</h1>
      <p className="item-price">{item.price} руб</p>
      <div className="leather-type">
        <p>Тип кожи:</p>
        <div className="leather-type__radio">
          <div className="leather-type__radio__box">
            <input
              type="radio"
              id="crazyHorse"
              name="leatherType"
              value="crazyHorse"
              defaultChecked
              className="leather-type__radio__box-input"
            />
            <label
              htmlFor="crazyHorse"
              className="leather-type__radio__box-label"
            >
              Crazy Horse
            </label>
          </div>
          <div className="leather-type__radio__box">
            <input
              type="radio"
              id="nappa"
              name="leatherType"
              value="nappa"
              className="leather-type__radio__box-input"
            />
            <label htmlFor="nappa" className="leather-type__radio__box-label">
              Nappa
            </label>
          </div>
          <div className="leather-type__radio__box">
            <input
              type="radio"
              id="pullUp"
              name="leatherType"
              value="pullUp"
              className="leather-type__radio__box-input"
            />
            <label htmlFor="pullUp" className="leather-type__radio__box-label">
              Pull Up
            </label>
          </div>
        </div>
      </div>
      <div className="colors">
        <div className="colors-btn">
          <p>Цвет кожи</p>
          <img
            src={black}
            alt=""
            className="colors-btn__img"
            onClick={chooseLeatherColor}
          />
        </div>
        <div className="colors-btn">
          <p>Цвет ниток</p>
          <img
            src={black}
            alt=""
            className="colors-btn__img"
            onClick={chooseThreadsColor}
          />
        </div>
      </div>
      <div className="item-tabs">
        <p
          className={`item-tabs--item ${currentTab === 1 && 'tab-active'}`}
          onClick={() => setCurrentTab(1)}
        >
          ОПИСАНИЕ
        </p>
        <p
          className={`item-tabs--item ${currentTab === 2 && 'tab-active'}`}
          onClick={() => setCurrentTab(2)}
        >
          ДЕТАЛИ
        </p>
      </div>
      <div className="item-tabs__text">
        {currentTab === 1 && (
          <div className="item-tabs__text-item">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aperiam soluta harum repellat consequatur ut voluptatem impedit
            neque doloribus deleniti accusamus quos commodi, saepe consectetur
            ea mollitia labore at maiores.
          </div>
        )}
        {currentTab === 2 && (
          <div className="item-tabs__text-item">
            <p>- Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
            <p>
              - In placeat fugit ducimus ipsam est dignissimos voluptatem amet
              eaque quod mollitia optio animi.
            </p>
            <p>
              - Praesentium, magnam non at cum doloremque, corrupti facilis.
            </p>
          </div>
        )}
      </div>
      <div className="item-btn">
        <Button onClick={() => {}} text="Заказать" color="black" big />
      </div>
    </>
  );
};

export default Description;
