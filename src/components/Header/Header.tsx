import style from './Header.module.css';
import logo from '../../images/logo_minimalism.png';
import { PiShoppingCartThin } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <img className={style.logo} src={logo} alt="" />
      <div className={style.search}>
        <input className={style.search__input} type="text" placeholder='Поиск'/>
        <IoSearchOutline className={style.search__icon} />
      </div>
      <PiShoppingCartThin className={style.card} />
    </header>
  )
}

export default Header;