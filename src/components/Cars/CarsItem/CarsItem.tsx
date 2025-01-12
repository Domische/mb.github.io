import { ICars } from '../Cars'
import style from './CarsItem.module.css'


const CarsItem: React.FC<ICars> = ({...item}) => {
  return (
    <li className={style.cars__item}>
        <img src={item.imageURL} alt="" />
        <span className={style.cars__item_title}>{item.name}</span>
        <ul className={style.cars__item_settings}>
            <li>{item.carbody}</li>
            <li>{item.color}</li>
            <li>{item.year} год</li>
            <li>{item.power} л.c.</li>
            <li>{(item.price).toLocaleString('ru')} руб.</li>
        </ul>
        <div className={style.cars__item_info}>
            <button>Подробнее</button>
            <button>Добавить в корзину</button>
        </div>
    </li>
  )
}

export default CarsItem