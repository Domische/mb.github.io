import { KeyboardEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import style from './Search.module.css'
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { setSearch } from '../../store/search/searchSlice';
import debounce from 'lodash/debounce';
import { PageContext } from '../Home/Home';

const Search: React.FC = () => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const { setPage } = useContext(PageContext)
    const {searchName} = useAppSelector(state=>state.search)

    useEffect(()=> {
        setValue(searchName)
    }, [searchName])

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
        <search role='search' className={style.search}>
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
        </search>
    )
}

export default Search