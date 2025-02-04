import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import style from './Cart.module.css'
import CartList from './CartList/CartList'
import { LiaRubleSignSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../hook';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import { useEffect } from 'react';
import { clearCars, getCartItems } from '../../store/cart/asyncActions';



const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const { cartList, loading } = useAppSelector(state => state.cart)
    const count = cartList.reduce((accum, item)=>accum+=item.count, 0);
    const totalPrice = cartList.reduce((accum, item)=> accum+=item.price*item.count, 0);

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch])

    const clearCartList = ()=> {
        dispatch(clearCars())
    }

    return (
        <div className={style.container}>
            <Header />
            {
                loading 
                ?
                <Loading />
                :
                cartList.length === 0
                    ?
                    <Error errorMessage='CartList is Empty' />
                    :
                    <section className={style.cart}>
                        <header>
                            <h2 className={style.cart__title}>Корзина</h2>
                        </header>
                        <span onClick={() => clearCartList()} className={style.cart__clear}><AiOutlineDelete className={style.cart__btn} />Очистить корзину</span>
                        <CartList />
                        <div className={style.cart__result}>
                            <span className={style.cart__price}>Сумма: {totalPrice.toLocaleString('ru')} руб.</span>
                            <span className={style.cart__count}>Всего: {count} шт.</span>
                        </div>
                        <button className={style.cart__pay}>Оплатить <LiaRubleSignSolid className={style.cart__ruble} /></button>
                    </section>
            }
            <Footer />
        </div>
    )
}

export default Cart