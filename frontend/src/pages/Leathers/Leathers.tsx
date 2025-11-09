import crazyHorse from '../../shared/assets/img/crazyHorse.jpg';
import nappa from '../../shared/assets/img/nappa.jpg';
import pullUp from '../../shared/assets/img/pullUp.jpg';
import Wrapper from '../../shared/ui/Wrapper/Wrapper';
import './leathers.scss';

const Leathers = () => {
  return (
    <Wrapper heading="Types of Leather">
      <div className="leathers__container">
        <div className="leathers__container__leather">
          <h1 className="leathers__container__leather-heading">Crazy Horse</h1>
          <div className="leathers__container__leather__content">
            <div className="leathers__container__leather__content-text">
              <p>
                This is a durable, high-quality leather from large cattle. This
                leather is characterized by its aging effect, which is achieved
                through a special treatment: a mixture of high-melting-point
                waxes and special additives is applied to the sanded crust using
                heat. After this treatment, the leather becomes darker than it
                was originally. As a result, it changes color in places where it
                is bent, folded, or stretched, becoming lighter.
              </p>
              <p>
                The vintage look is the main feature of this leather. Marks and
                scratches easily appear on Crazy Horse leather, but they can be
                easily removed by rubbing the area with a soft cloth. This
                leather can also be darkened by friction using a felt wheel,
                even without adding wax. If you want a uniform color, simply
                iron it on low temperature through paper.
              </p>
              <p>
                Crazy Horse leather is quite soft, elastic, smooth, and matte.
                The thickness is usually 1.4-3 mm. It has a dense structure.
                Products made from this leather look unusual, stylish, and
                expensive.
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
                The perfect choice for true connoisseurs of quality materials.
                This leather is made from the hides of large cattle or sheep.
              </p>
              <p>
                Nappa leather is a very beautiful material that undergoes
                special processing and chrome tanning. The main feature of the
                material is its solid color. In addition, nappa leather has the
                following characteristics: it is pliable, elastic, thin, and
                soft. However, these properties do not prevent the material from
                being strong and reliable. Therefore, products made from this
                leather are durable and will serve the owner for many years.
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
                Natural waxed premium leather with a thickness of 1.4-1.6 mm, in
                rare cases up to 2 mm. In addition to high quality and excellent
                consumer properties, the unusual texture and two-tone, marbled
                coloring with an aging effect encourage the purchase of products
                made from it.
              </p>
              <p>
                This finish is achieved by applying special fats, oils, or
                high-melting waxes to the surface of sanded leather. As a rule,
                the color of the coating mixture is darker than the base color.
                The "Pull-up" effect means that in places of bending or
                stretching, the leather changes color, revealing its unique
                properties.
              </p>
              <p>
                Over time, some areas of the leather become lighter, making
                products made from such leather look somewhat worn and
                experienced. An incomparable texture appears. This material is
                also valued for its softness and pleasant-to-the-touch texture.
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
    </Wrapper>
  );
};

export default Leathers;
