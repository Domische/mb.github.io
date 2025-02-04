import { useParams } from 'react-router-dom'
import style from './CarInfo.module.css'
import { useCallback, useEffect, useState } from 'react';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ICars } from '../../store/cars/types';

const CarInfo: React.FC = () => {
    const [car, setCar] = useState<ICars>();
    const { id } = useParams();

    const getCarById = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3002/cars/${id}`);
            if (!response.ok) {
                return <Error errorMessage='Car Not Found' />
            }
            const data = await response.json();
            if (data) {
                setCar(data);
            }
        } catch (error) {
            return <Error errorMessage='Car Not Found' />
        }
    }, [id])


    useEffect(() => {
        getCarById()
    }, [getCarById])

    if (car) {
        return (
            <div className={style.info}>
                <Header />
                <section className={style.car}>
                    <header>
                        <h2 className={style.car__title}>{car.name}</h2>
                    </header>
                    <article className={style.car__info}>
                        <img className={style.car__img} src={car.imageURL} alt="" />
                        <div className={style.car__text}>
                            <h3 className={style.car__characteristics}>Характеристики:</h3>
                            <ul className={style.car__list}>
                                <li className={style.car__item}>Кузов: {car.carbody}</li>
                                <li className={style.car__item}>Цвет: {car.color}</li>
                                <li className={style.car__item}>Год выпуска: {car.year}</li>
                                <li className={style.car__item}>Мощность: {car.power} л.с.</li>
                                <li className={style.car__item}>Цена: {(car.price).toLocaleString('ru')} руб.</li>
                            </ul>
                        </div>
                    </article>
                </section>
                <Footer />
            </div>
        )
    } else {
        return <Loading />
    }
}

export default CarInfo