import { useState } from 'react';
import style from './Pagination.module.css';
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";

const paginArr = [1,2,3]

const Pagination = () => {
    let [count, setCount] = useState(0);

    const onClickPrev = ()=> {
        count<=0 ? setCount(0) : setCount(count-=1);
    }

    const onClickNext = ()=> {
        count>=paginArr.length-1 ? setCount(paginArr.length-1) : setCount(count+=1);
    }

    return (
        <div className={style.pagination}>
            <CiCircleChevLeft onClick={()=>onClickPrev()} className={style.pagination__btn} />
            <ul className={style.pagination__list}>
                {paginArr.map((item, index)=><li onClick={()=>setCount(index)} className={count===index ? style.pagination__list_item_active : style.pagination__list_item}>{item}</li>)}
            </ul>
            <CiCircleChevRight onClick={()=>onClickNext()} className={style.pagination__btn} />
        </div>
    )
}

export default Pagination