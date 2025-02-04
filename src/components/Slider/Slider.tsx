import { useEffect, useRef, useState } from 'react';
import style from './Slider.module.css';
import { BsChevronCompactRight, BsChevronCompactLeft} from "react-icons/bs";
import { fetchPhoto } from '../../store/photo/asyncActions';
import { useAppDispatch, useAppSelector } from '../../hook';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

const Slider: React.FC = () => {
    const dispatch = useAppDispatch();

    const {photoList, error, loading} = useAppSelector(state=>state.photo)

    const [width, setWidth] = useState(1200)
    let [count, setCount] = useState(0);

    const sliderLine = useRef<HTMLUListElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    const onClickNext = ()=> {
        count>=photoList.length-1 ? setCount(photoList.length-1) : setCount(count+=1);
    }

    const onClickPrev = ()=> {
        count<=0 ? setCount(0) : setCount(count-=1);
    }

    useEffect(() => {
        dispatch(fetchPhoto())
    }, [dispatch])

    useEffect(()=> {
        const init = (): void => {
            const _width=slider.current?.offsetWidth;
            _width && setWidth(_width);
        }
        init();
        window.addEventListener('resize', init);
        return ()=> {
            window.removeEventListener('resize', init);
        }
    }, [])

    if (error) {
        return (
            <Error errorMessage={error}/>
        )
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div ref={slider} className={style.container}>
            <BsChevronCompactLeft onClick={()=>onClickPrev()} className={style.leftBtn} />
            <div style={{width: width}} className={style.slider}>
                <ul ref={sliderLine} className={style.slider__line} style={{
                    transform: `translateX(${-width*count}px)`,
                    transition: `transform 0.8s ease-in-out`
                }}>
                {photoList.map((item, index) => <li className={style.slider__line_item} key={index}><img style={{width: width}} src={item.url} alt="" /></li>)}
                </ul>
            </div>
            <BsChevronCompactRight onClick={()=>onClickNext()} className={style.rightBtn}/>
        </div>
    )
}

export default Slider