import { CiFilter } from "react-icons/ci";
import style from './Filter.module.css'
import { useContext, useEffect, useRef, useState } from "react";
import FilterBlock from "./FilterBlock/FilterBlock";
import { useAppDispatch, useAppSelector } from "../../hook";
import { clearFilter } from "../../store/filterSlice";
import { fetchCars } from "../../store/carsSlice";
import { PageContext } from "../../App";
import { clearPrice } from "../../store/priceSlice";

const colorArr: string[] = [
    'Белый',
    'Серый',
    'Черный',
    'Синий',
    'Красный',
    'Зеленый',
    'Розовый',
];

const carBodyArr: string[] = [
    'Седан',
    'Внедорожник',
    'Кроссовер',
    'Минивен',
]

const priceArr: string[] = [
    'От',
    'До',
]

export interface IFilterTypeArr {
    title: string;
    arr: string[];
    // setActive: Dispatch<SetStateAction<boolean>>;
    active: boolean;
}

const Filter: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState(false);
    // const [activeColor, setActiveColor] = useState(false);
    // const [activeCarBody, setActiveCarBody] = useState(false);
    const { setPage } = useContext(PageContext)
    const filter = useRef(null);

    const dispatch = useAppDispatch();

    const { colors, carbodies } = useAppSelector(state => state.filter);

    const { sortName, sortProperty } = useAppSelector(state => state.sort)

    const { searchName } = useAppSelector(state => state.search)

    const { price } = useAppSelector(state => state.price)


    useEffect(() => {
        const closeFilter = (e: MouseEvent) => {
            if (filter.current && !e.composedPath().includes(filter.current)) {
                setActiveFilter(false)
                // setActiveColor(false)
                // setActiveCarBody(false)
            }
        }
        document.addEventListener('click', closeFilter)
        return () => {
            document.removeEventListener('click', closeFilter)
        }
    }, [])

    const filterTypeArr: IFilterTypeArr[] = [
        {
            title: 'Цвет',
            arr: colorArr,
            active: activeFilter
        },
        {
            title: 'Кузов',
            arr: carBodyArr,
            active: activeFilter
        },
        {
            title: 'Цена',
            arr: priceArr,
            active: activeFilter
        }
    ]
    return (
        <div ref={filter} className={style.container}>
            <CiFilter onClick={() => {
                setActiveFilter(!activeFilter)
            }} className={style.filterBtn} />

            <div className={activeFilter ? style.filter_active : style.filter}>
                {filterTypeArr.map(item => <FilterBlock key={item.title} title={item.title} arr={item.arr} active={item.active} />)}
                <button onClick={() => {
                    dispatch(clearFilter())
                    dispatch(clearPrice())
                }} className={style.saveBtn}>Очистить</button>
                <button onClick={() => {
                    setPage(0);
                    dispatch(fetchCars({ page: 0, colors, carbodies, sortName, sortProperty, searchName, priceFrom: price.from, priceTo: price.to }))
                }} className={style.saveBtn}>Показать</button>
            </div>
        </div>
    )
}

export default Filter