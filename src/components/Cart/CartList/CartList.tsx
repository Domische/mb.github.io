import { useAppSelector } from '../../../hook'
import CartItem from './CartItem/CartItem'
import style from './CartList.module.css'

const CartList: React.FC = () => {
    const { cartList } = useAppSelector(state => state.cart)

    return (

        <ul className={style.cart__list}>
            {cartList.length !== 0 && cartList.map(car => <CartItem key={car.id} {...car} />)}
        </ul>

    )

}

export default CartList