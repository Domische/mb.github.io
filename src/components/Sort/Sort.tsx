import { VscListFilter } from "react-icons/vsc";
import style from './Sort.module.css';
import { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";

interface ISortItem {
  sortName: string;
  sortProperty: string;
}

type SortArr = ISortItem[];

const sortArr: SortArr = [
  { sortName: 'Дешевле', sortProperty: 'asc' },
  { sortName: 'Дороже', sortProperty: 'desc' },
  { sortName: 'Cтарые', sortProperty: 'asc' },
  { sortName: 'Новые', sortProperty: 'desc' },
  { sortName: 'Непопулярные', sortProperty: 'asc' },
  { sortName: 'Популярные', sortProperty: 'desc' },
]

const Sort = () => {
  const [activeSort, setActiveSort] = useState(false);
  const sort = useRef(null);

  const [selected, setSelected] = useState(0);

  //использовать useContext чтобы не убирался фильтр и сортировка чтоб они были в одной области так сказать

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
            setSelected(index)
            setActiveSort(false)
          }} key={index} className={selected===index?style.sort__list_item_active:style.sort__list_item}>{item.sortName}{selected===index&&<FiCheck />}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Sort