import { CiFilter } from "react-icons/ci";
import style from './Filter.module.css'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import FilterBlock from "./FilterBlock/FilterBlock";

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

export interface IFilterTypeArr {
    title: string;
    arr: string[];
    setActive: Dispatch<SetStateAction<boolean>>;
    active: boolean;
}

const Filter: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState(false);
    const [activeColor, setActiveColor] = useState(false);
    const [activeCarBody, setActiveCarBody] = useState(false);
    const filter = useRef(null);


    useEffect(() => {
        const closeFilter = (e: MouseEvent) => {
            if (filter.current && !e.composedPath().includes(filter.current)) {
                setActiveFilter(false)
                setActiveColor(false)
                setActiveCarBody(false)
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
            setActive: setActiveColor,
            active: activeColor
        },
        {
            title: 'Кузов',
            arr: carBodyArr,
            setActive: setActiveCarBody,
            active: activeCarBody
        }
    ]
    return (
        <div ref={filter} className={style.container}>
            <CiFilter onClick={() => {
                setActiveFilter(!activeFilter)
                setActiveColor(false)
                setActiveCarBody(false)
            }} className={style.filterBtn} />

            <div className={activeFilter ? style.filter_active : style.filter}>
                {filterTypeArr.map(item => <FilterBlock key={item.title} title={item.title} arr={item.arr} setActive={item.setActive} active={item.active} />)}
                <button className={style.saveBtn}>Очистить</button>
                <button className={style.saveBtn}>Сохранить</button>
            </div>
        </div>
    )
}

export default Filter