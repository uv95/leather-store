import React from 'react';
import './leathers.scss';
import nappa from '../../assets/img/nappa.jpg';
import crazyHorse from '../../assets/img/crazyHorse.jpg';
import pullUp from '../../assets/img/pullUp.jpg';
import Back from '../../components/UI/Back/Back';

type Props = {};

const Leathers = (props: Props) => {
  return (
    <div className="leathers">
      <div className="leathers-heading">
        <Back />
        <h1>Типы кожи</h1>
      </div>
      <div className="leathers__container">
        <div className="leathers__container__leather">
          <h1 className="leathers__container__leather-heading">Crazy Horse</h1>
          <div className="leathers__container__leather__content">
            <div className="leathers__container__leather__content-text">
              <p>
                Это прочная высококачественная кожа крупного рогатого скота. Эта
                кожа характерна своим эффектом состаривания. Он образуется
                благодаря специальной обработке: на шлифованный краст с помощью
                нагрева наносится смесь восков с высокой температурой плавления
                и специальные присадки. После обработки таким способом кожа
                становится темнее, нежели была изначально. В результате этого
                она меняет цвет в местах залома, изгиба или натяжения,
                становится более светлой.
              </p>
              <p>
                Винтажность ― это самая главная особенность этой кожи. На коже
                Crazy Horse легко появляются следы и царапины. Царапины при
                желании легко удалить. Для этого достаточно протереть это место
                мягкой тряпочкой. Такая кожа легко затемняется трением с помощью
                войлочного круга даже без добавления воска. Если вам нужен
                равномерный окрас кожи достаточно прогладить ее утюгом выставив
                его на минимальную температуру через бумагу.
              </p>
              <p>
                Кожа Crazy Horse достаточно мягкая, эластичная, гладкая, без
                блеска. Толщина обычно 1,4-3 мм. Имеет плотную структуру.
                Изделия из этой кожи выглядят необычно, стильно, дорого.
              </p>
            </div>
            <img
              src={crazyHorse}
              alt="crazyHorse"
              className="leathers__container__leather__content-img"
            />
          </div>
        </div>
        <div className="leathers__container__leather">
          <h1 className="leathers__container__leather-heading">Nappa</h1>
          <div className="leathers__container__leather__content">
            <img
              src={nappa}
              alt="nappa"
              className="leathers__container__leather__content-img"
            />
            <div className="leathers__container__leather__content-text">
              <p>
                Идеальный вариант для истинных ценителей качественных
                материалов. Такая кожа создается из шкур крупного рогатого скота
                или овчины.
              </p>
              <p>
                Кожа наппа — это очень красивый материал, который проходит
                обработку особым образом, а также “переживает ”хромовое
                дубление. Основная особенность материала заключается в его
                однотонной расцветки. Кроме этого, кожа nappa имеет следующие
                характеристики: пластичная, эластичная, тонкая, а также мягкая.
                Однако эти свойства не мешают материалу иметь высокий уровень
                прочности и надежности. Поэтому изделия, созданные из этой кожи,
                долговечны, прослужат владельцу не один год.
              </p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
        <div className="leathers__container__leather">
          <h1 className="leathers__container__leather-heading">Pull Up</h1>
          <div className="leathers__container__leather__content">
            <div className="leathers__container__leather__content-text">
              <p>
                Натуральная вощеная кожа премиум-класса толщиной 1.4-1.6мм., в
                редких случаях доходит до 2мм. Покупать изделия из нее, помимо
                высокого качества, отличных потребительских свойств, побуждают
                необычная фактура поверхности и двухцветная, мраморная окраска с
                эффектом состаривания.
              </p>
              <p>
                Данную выделку получают нанесением специальных жиров, масел,
                либо тугоплавких восков на поверхность шлифованной кожи. Как
                правило, цвет покрывной смеси темнее, чем фоновый цвет основы.
                Эффект "Pull-up" заключается в том, что в местах изгиба или
                натяжения кожа меняет цвет, проявляются ее специфичные свойства.
              </p>
              <p>
                Cо временем некоторые участки кожи становятся более светлыми, за
                счет чего изделие из такой кожи выглядит несколько изношенным,
                видавшим виды. Проявляется ни с чем не сравнимая фактура. Так же
                данный материал ценится за свою мягкость и приятную на ощупь
                текстуру.
              </p>
            </div>
            <img
              src={pullUp}
              alt="pullUp"
              className="leathers__container__leather__content-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leathers;
