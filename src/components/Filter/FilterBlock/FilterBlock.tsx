import { BsChevronDown } from "react-icons/bs";
import style from './FilterBlock.module.css'
import FilterList from "./FilterList/FilterList";
import { IFilterTypeArr } from "../Filter";


const FilterBlock: React.FC<IFilterTypeArr> = ({title, arr, setActive, active }) => {
    return (
        <>
            <div className={style.filter__block}>
                <span>{title}</span>
                <BsChevronDown onClick={() => setActive(!active)} className={active ? style.filter__open_active : style.filter__open} />
            </div>
            <FilterList arr={arr}  active={active} />
        </>
    )
}

export default FilterBlock