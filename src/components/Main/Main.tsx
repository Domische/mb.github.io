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
      <section className={style.cars}>
        <header>
          <h2>Автомобили в наличии</h2>
        </header>
        <aside className={style.cars__settings}>
          <Filter />
          <Sort />
        </aside>
        <Cars />
        <Pagination />
      </section>
    </main>
  )
}

export default Main