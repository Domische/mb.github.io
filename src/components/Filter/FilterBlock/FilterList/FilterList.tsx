import FilterItem from "./FilterItem/FilterItem";
import style from './FilterList.module.css'

interface IFilterListProps {
    arr: string[];
    active: boolean
}

const FilterList: React.FC<IFilterListProps> = ({arr, active}) => {
    return (
        <ul className={active ? style.filter__block_list_active : style.filter__block_list}>
            {arr.map((item, index) => <FilterItem key={index} value={item}/>)}
        </ul>
    )
}

export default FilterList