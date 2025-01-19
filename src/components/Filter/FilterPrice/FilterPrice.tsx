import { useAppDispatch, useAppSelector } from '../../../hook';
import { setPriceFrom, setPriceTo } from '../../../store/priceSlice';
import style from './FilterPrice.module.css'

interface IFilterPriceProps {
    value: string;
}

const FilterPrice: React.FC<IFilterPriceProps> = ({ value }) => {
    const dispatch = useAppDispatch()
    const { price } = useAppSelector(state => state.price)

    return (
        <input onChange={(e) => dispatch(value === 'От' ? setPriceFrom(e.target.value) : setPriceTo(e.target.value))} className={style.filter__price} type="number" placeholder={value} value={value === 'От' ? price.from : price.to} />
    )
}

export default FilterPrice