import { useContext } from 'react';
import { useAppSelector } from '../../hook';
import style from './Pagination.module.css';
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
import { PageContext } from '../../App';

const paginArr = [1,2,3]

const Pagination: React.FC = () => {
    const {loading} = useAppSelector(state=>state.cars)
    let {page, setPage} = useContext(PageContext)

    const onClickPrev = ()=> {
        if(!loading){
            page <= 0 ? setPage(0) : setPage(page -= 1);
        }
    }

    const onClickNext = ()=> {
        if(!loading){
            page >= paginArr.length - 1 ? setPage(paginArr.length - 1) : setPage(page += 1)
        }
    }
    return (
        <div className={style.pagination}>
            <CiCircleChevLeft onClick={()=> onClickPrev()} className={style.pagination__btn} />
            <ul className={style.pagination__list}>
                {paginArr.map((item, index)=><li key={index} onClick={()=>setPage(index)} className={page===index ? style.pagination__list_item_active : style.pagination__list_item}>{item}</li>)}
            </ul>
            <CiCircleChevRight onClick={()=> onClickNext()} className={style.pagination__btn} />
        </div>
    )
}

export default Pagination