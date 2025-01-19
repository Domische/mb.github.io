import style from './FilterItem.module.css'
import { FiCheck } from "react-icons/fi";
import { setFilter } from '../../../../../store/filterSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import FilterPrice from '../../../FilterPrice/FilterPrice';

export interface IFilterItemProps {
  value: string;
  title: string;
}

const FilterItem: React.FC<IFilterItemProps> = ({ title, value }) => {
  // const [check, setCheck] = useState(false);
  const { colors, carbodies } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const check = colors.some(item => item === value) || carbodies.some(item => item === value);
  return (
    <li onClick={() => dispatch(setFilter({ title, value }))} className={check ? style.filter__block_list_item_check : style.filter__block_list_item}>
      {title === 'Цена'
        ?
        <FilterPrice value={value}/>
        :
        <>
          {value}
          {check && <FiCheck className={style.check} />}
        </>
      }
    </li>
  )
}

export default FilterItem