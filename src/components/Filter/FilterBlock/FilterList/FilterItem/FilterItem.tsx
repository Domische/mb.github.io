import { useState } from 'react';
import style from './FilterItem.module.css'
import { FiCheck } from "react-icons/fi";

interface IFilterItemProps {
    value: string;
}

const FilterItem: React.FC<IFilterItemProps> = ({value}) => {
  const [check, setCheck] = useState(false);
  return (
    <li onClick={()=>setCheck(!check)} className={check?style.filter__block_list_item_check:style.filter__block_list_item}>{value}{check&&<FiCheck className={style.check}/>}</li>
  )
}

export default FilterItem