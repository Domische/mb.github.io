import style from './CartItem.module.css'
import { PiPlus } from "react-icons/pi";
import { PiMinus } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch } from '../../../../hook';
import { ICars } from '../../../../store/cars/types';
import { deleteCartItems, patchCartItems } from '../../../../store/cart/asyncActions';


const CartItem: React.FC<ICars> = ({ ...car }) => {
  const dispatch = useAppDispatch()

  const changeCart = (math: string) => {
    dispatch(patchCartItems({id: car.id, math}))
  }

  return (
    <li className={style.cart__item}>
      <article className={style.cart__article}>
        <div className={style.cart__car}>
          <img className={style.cart__image} src={car.imageURL} alt="" />
          <ul className={style.cart__info}>
            <li className={style.cart__text}>
              {car.name}
            </li>
            <li className={style.cart__text}>
              {car.carbody}
            </li>
            <li className={style.cart__text}>
              {car.color}
            </li>
            <li className={style.cart__text}>
              {car.year} год
            </li>
            <li className={style.cart__text}>
              {car.power} л.с.
            </li>
          </ul>
        </div>
        <div className={style.cart__quantity}>
          <PiMinus onClick={()=> changeCart('-')} className={style.cart__minus} />
          <span className={style.cart__count}>
            {car.count}
          </span>
          <PiPlus onClick={()=> changeCart('+')} className={style.cart__plus} />
        </div>
        <span className={style.cart__sum}>
          {(car.price*car.count).toLocaleString('ru')} руб.
        </span>
        <RxCross1 onClick={()=> {
          dispatch(deleteCartItems(car.id))
        }} className={style.cart__delete} />
      </article>
    </li>
  )
}

export default CartItem