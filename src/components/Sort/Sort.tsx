import { VscListFilter } from "react-icons/vsc";
import style from './Sort.module.css';
import { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hook";
import { setSort } from "../../store/sort/sortSlice";

interface ISortItem {
  sortName: string;
  sortTitle: string;
  sortProperty: string;
}

type SortArr = ISortItem[];

const sortArr: SortArr = [
  { sortName: 'price', sortTitle: 'Дешевле', sortProperty: 'asc' },
  { sortName: 'price', sortTitle: 'Дороже', sortProperty: 'desc' },
  { sortName: 'year', sortTitle: 'Cтарые', sortProperty: 'asc' },
  { sortName: 'year', sortTitle: 'Новые', sortProperty: 'desc' },
  { sortName: 'rating', sortTitle: 'Непопулярные', sortProperty: 'desc' },
  { sortName: 'rating', sortTitle: 'Популярные', sortProperty: 'asc' },
]

const Sort: React.FC = () => {
  const [activeSort, setActiveSort] = useState(false);
  const sort = useRef(null);

  const dispatch = useAppDispatch();
  const {sortName, sortProperty} = useAppSelector(state=> state.sort)

  useEffect(() => {
    const closeSort = (e: MouseEvent)=> {
      if(sort.current && !e.composedPath().includes(sort.current)) {
        setActiveSort(false);
      }
    }
    document.addEventListener('click', closeSort);
    return ()=> {
      document.removeEventListener('click', closeSort);
    }
  }, [])


  return (
    <div ref={sort} className={style.container}>
      <VscListFilter onClick={() => setActiveSort(!activeSort)} className={style.sortBtn} />
      <div className={style.sort}>
        <ul className={activeSort ? style.sort__list_active : style.sort__list}>
          {sortArr.map((item, index) => <li onClick={()=>{
            dispatch(setSort({sortName: item.sortName, sortProperty: item.sortProperty}))
            setActiveSort(false)
          }} key={index} className={sortName===item.sortName&&sortProperty===item.sortProperty?style.sort__list_item_active:style.sort__list_item}>{item.sortTitle}{sortName===item.sortName&&sortProperty===item.sortProperty&&<FiCheck />}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Sort