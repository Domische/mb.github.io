import style from './Header.module.css';
import logo from '../../images/logo_minimalism.png';
import { PiShoppingCartThin } from "react-icons/pi";
import { useEffect, useState } from 'react';
import Search from '../Search/Search';

const Header: React.FC = () => {
  const [animation, setAnimation] = useState(false);
  useEffect(()=> {
    setAnimation(false)
    setAnimation(true)
  }, [])
  return (
    <header className={style.header}>
      <img className={animation ? style.logo_active : style.logo} src={logo} alt="" />
      <Search />
      <PiShoppingCartThin className={style.card} />
    </header>
  )
}

export default Header;