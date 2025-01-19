import { useContext, useEffect, useRef } from 'react';
import style from './Cars.module.css'
import Error from '../Error/Error';
import CarsItem from './CarsItem/CarsItem';
import Skeleton from '../Skeleton/Skeleton';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchCars } from '../../store/carsSlice';
import { PageContext } from '../../App';

export interface ICars {
    name: string;
    imageURL: string;
    carbody: string,
    color: string,
    price: number,
    rating: number,
    year: number,
    id: number,
    power: number
}

const Cars: React.FC = () => {

    // const [cars, setCars] = useState<ICars[]>([]);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(true);

    const skeleton = [...new Array(6)].map((item, index)=> <Skeleton key={index} />)
    const {page} = useContext(PageContext)

    // const getCars = async (url: string): Promise<void> => {
    //     try {
    //         const response = await fetch(url);
            
    //         if (response.ok) {
    //             const data = await response.json();
    //             setCars(data as ICars[])
    //             setLoading(false)
    //         } else {
    //             setError(true)
    //             setLoading(false)
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         setError(true)
    //         setLoading(false)
    //     }
    // }
    const dispatch = useAppDispatch();

    const {carsList, loading, error} = useAppSelector(state=>state.cars)

    const {colors, carbodies} = useAppSelector(state=>state.filter);

    const colorsRef = useRef(colors)
    const carbodiesRef = useRef(carbodies)

    const {sortName, sortProperty} = useAppSelector(state=>state.sort)

    const {searchName} = useAppSelector(state=>state.search)

    const {price} = useAppSelector(state=>state.price)

    const priceFromRef = useRef(price.from);
    const priceToRef = useRef(price.to);
    
    // useEffect(() => {
    //     setLoading(true);
    //     getCars(`http://localhost:3002/cars?_page=${page+1}&_limit=6${colors.map((item)=> `&color_like=${item}`).join('')}`)
    // }, [page])
    
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
            <Error errorName={error}/>
        )
    }

    return (
        <ul className={style.cars__list}>
            {loading ? skeleton : carsList.map(item => <CarsItem key={item.id} {...item}/>)}
        </ul>
    )
}

export default Cars