import { useEffect, useState } from 'react';
import style from './Cars.module.css'
import Error from '../Error/Error';
import CarsItem from './CarsItem/CarsItem';

export interface ICars {
    name: string;
    imageURL: string;
    carbody: string,
    color: string,
    price: number,
    rating: number,
    year: number,
    id: number,
    power: number
}

const Cars = () => {

    const [cars, setCars] = useState<ICars[]>([]);
    const [error, setError] = useState(false);

    const getCars = async (url: string): Promise<void> => {
        try {
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                setCars(data as ICars[])
            } else {
                setError(true)
            }

        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    useEffect(() => {
        getCars('http://localhost:3002/cars')
    }, [])

    if (error) {
        return (
            <Error errorName={'CarsError'}/>
        )
    }

    return (
        <ul className={style.cars__list}>
            {cars.map(item => <CarsItem {...item}/>)}
        </ul>
    )
}

export default Cars