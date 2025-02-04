import { useContext, useEffect, useRef } from 'react';
import style from './Cars.module.css'
import Error from '../Error/Error';
import CarsItem from './CarsItem/CarsItem';
import Skeleton from '../Skeleton/Skeleton';
import { useAppDispatch, useAppSelector } from '../../hook';
import { PageContext } from '../Home/Home';
import { fetchCars } from '../../store/cars/asyncActions';



const Cars: React.FC = () => {
    const {page} = useContext(PageContext)

    const skeleton = [...new Array(6)].map((item, index)=> <Skeleton key={index} />)

    const dispatch = useAppDispatch();

    const {carsList, loading, error} = useAppSelector(state=>state.cars)
    const {colors, carbodies} = useAppSelector(state=>state.filter);
    const {sortName, sortProperty} = useAppSelector(state=>state.sort)
    const {searchName} = useAppSelector(state=>state.search)
    const {price} = useAppSelector(state=>state.price)
    
    const colorsRef = useRef(colors)
    const carbodiesRef = useRef(carbodies)
    const priceFromRef = useRef(price.from);
    const priceToRef = useRef(price.to);
    
    //используем хук useRef, на изменение переменных которого useEffect все равно, 
    //чтобы не отправлялся запрос на сервер при изменении colors и carbodies,
    //а только после других изменений или нажатия на кнопку "Показать" и тд

    useEffect(()=> {
        colorsRef.current=colors;
        carbodiesRef.current=carbodies;
    }, [colors, carbodies])

    useEffect(()=> {
        priceFromRef.current=price.from;
        priceToRef.current=price.to;
    }, [price.from, price.to])

    useEffect(()=>{
        dispatch(fetchCars({page, colors: colorsRef.current, carbodies: carbodiesRef.current, sortName, sortProperty, searchName, priceFrom: priceFromRef.current, priceTo: priceToRef.current}))
    }, [page, sortName, sortProperty, searchName, dispatch, colorsRef, carbodiesRef, priceFromRef, priceToRef])

    if (error) {
        return (
            <Error errorMessage={error}/>
        )
    }

    return (
        <ul className={style.cars__list}>
            {loading ? skeleton : carsList.map(item => <CarsItem key={item.id} {...item}/>)}
        </ul>
    )
}

export default Cars