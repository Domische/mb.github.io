import { useEffect, useRef, useState } from 'react';
import style from './Slider.module.css';
import Error from '../Error/Error';
import { BsChevronCompactRight, BsChevronCompactLeft} from "react-icons/bs";
import { fetchPhoto } from '../../store/photoSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import Loading from '../Loading/Loading';

// interface IPhoto {
//     id: number;
//     url: string;
// }

const Slider: React.FC = () => {
    // const [photo, setPhoto] = useState<IPhoto[]>([])
    // const [error, setError] = useState(false)
    const {photoList, error, loading} = useAppSelector(state=>state.photo)
    const [width, setWidth] = useState(1200)
    const sliderLine = useRef<HTMLUListElement>(null);
    const slider = useRef<HTMLDivElement>(null);
    let [count, setCount] = useState(0);
    const dispatch = useAppDispatch();

    // const getPhoto = async (url: string): Promise<void> => {
    //     try {
    //         const response = await fetch(url);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setPhoto(data);
    //         } else {
    //             setError(true)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setError(true);
    //     }
    // }

    // useEffect(() => {
    //     getPhoto('http://localhost:3001/photo')
    // }, [])

    useEffect(() => {
        dispatch(fetchPhoto())
    }, [])

    const onClickNext = ()=> {
        count>=photoList.length-1 ? setCount(photoList.length-1) : setCount(count+=1);
    }

    const onClickPrev = ()=> {
        count<=0 ? setCount(0) : setCount(count-=1);
    }

    // useEffect(()=> {
    //     if(count>photo.length-1){
    //         setCount(photo.length-1)
    //     } else if (count<0) {
    //         setCount(0)
    //     }
    // }, [count])

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
            <Error errorName={error}/>
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