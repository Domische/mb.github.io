import { BsChevronDown } from "react-icons/bs";
import style from './FilterBlock.module.css'
import FilterList from "./FilterList/FilterList";
import { IFilterTypeArr } from "../Filter";
import { useEffect, useState } from "react";


const FilterBlock: React.FC<IFilterTypeArr> = ({ title, arr, active }) => {
    const [activeBlock, setActiveBlock] = useState(false);
    useEffect(() => {
        setActiveBlock(false);
    }, [active])
    return (
        <>
            <div className={style.filter__block}>
                <span>{title}</span>
                <BsChevronDown onClick={() => setActiveBlock(!activeBlock)} className={activeBlock ? style.filter__open_active : style.filter__open} />
            </div>
            <FilterList title={title} arr={arr??[]} active={activeBlock} />
        </>
    )
}

export default FilterBlock