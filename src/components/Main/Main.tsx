import Filter from '../Filter/Filter';
import Slider from '../Slider/Slider';
import Sort from '../Sort/Sort';
import Cars from '../Cars/Cars'
import style from './Main.module.css';
import Pagination from '../Pagination/Pagination';

const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <Slider />
      <h1>Автомобили в наличии</h1>
      <div className={style.settings}>
        <Filter />
        <Sort />
      </div>
      <Cars />
      <Pagination />
    </main>
  )
}

export default Main