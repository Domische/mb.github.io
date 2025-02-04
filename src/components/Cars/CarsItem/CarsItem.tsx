import { Link } from 'react-router-dom'
import style from './CarsItem.module.css'
import { PiMinus, PiPlus } from 'react-icons/pi'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../hook'
import { setCount } from '../../../store/cars/carsSlice'
import { ICars } from '../../../store/cars/types'
import { patchCars } from '../../../store/cars/asyncActions'


const CarsItem: React.FC<ICars> = ({ ...item }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (item.count >= 10) {
      setTimeout(() => {
        dispatch(setCount(item.id))
      }, 500)
    }
  }, [dispatch, item.count, item.id])


  const changeCars = (math: string) => {
    dispatch(patchCars({id: item.id, math}))
  }

  return (
    <li className={style.cars__item}>
      <article className={style.cars__item_article}>
        <img className={style.cars__item_img} src={item.imageURL} alt="" />
        <header>
          <h3 className={style.cars__item_title}>{item.name}</h3>
        </header>
        <ul className={style.cars__item_settings}>
          <li>{item.carbody}</li>
          <li>{item.color}</li>
          <li>{item.year} год</li>
          <li>{item.power} л.c.</li>
          <li>{(item.price).toLocaleString('ru')} руб.</li>
        </ul>
        <div className={style.cars__item_info}>
          <Link to={`car/${item.id}`} className={style.cars__item_link}>Подробнее</Link>
          {item.count === 0
            ?
            <button onClick={() => changeCars('')} className={style.cars__item_add}>Добавить в корзину</button>
            :
            item.count > 10
              ?
              <button className={style.cars__item_max}>
                Больше нельзя...
              </button>
              :
              <button className={style.cars__item_quantity}>
                <PiMinus onClick={() => changeCars('-')} className={style.cart__item_minus} />
                <span className={style.cars__item_count}>{item.count}</span>
                <PiPlus onClick={() => changeCars('+')} className={style.cart__item_plus} />
              </button>
          }
        </div>
      </article>
    </li >
  )
}

export default CarsItem