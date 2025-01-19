import { KeyboardEvent, useCallback, useContext, useRef, useState } from 'react';
import { useAppDispatch } from '../../hook';
import style from './Search.module.css'
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { PageContext } from '../../App';
import { setSearch } from '../../store/searchSlice';
import debounce from 'lodash/debounce';

const Search = () => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const { setPage } = useContext(PageContext)

    const debouncer = useRef(debounce((str: string) => {
        dispatch(setSearch(str))
    }, 1000))

    const searchDebounce = useCallback((str: string) =>
        debouncer.current(str),
        [debouncer]
    );

    const updateSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        searchDebounce(e.target.value)
        setPage(0)
    }

    const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(setSearch(value))
            setPage(0)
        }
    }

    return (
        <div className={style.search}>
            <input onKeyDown={(e) => onClickEnter(e)} onChange={(e) => updateSearchText(e)} className={style.search__input} type="text" placeholder='Поиск' value={value} />
            {value
                ?
                <RxCross1 onClick={()=>{
                    setValue('')
                    dispatch(setSearch(''))
                }} className={style.search__icon}/>
                :
                <IoSearchOutline onClick={() => dispatch(setSearch(value))} className={style.search__icon} />
            }
        </div>
    )
}

export default Search