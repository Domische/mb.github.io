import FilterItem from "./FilterItem/FilterItem";
import style from './FilterList.module.css'

interface IFilterListProps {
    arr: string[];
    active: boolean;
    title: string;
}

const FilterList: React.FC<IFilterListProps> = ({arr, active, title}) => {
    return (
        <ul className={active ? style.filter__block_list_active : style.filter__block_list}>
            {arr.map((item, index) => <FilterItem key={index} title={title} value={item}/>)}
        </ul>
    )
}

export default FilterList