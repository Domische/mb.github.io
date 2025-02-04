import style from './Header.module.css';
import logo from '../../images/logo_minimalism.png';
import { PiShoppingCartThin } from "react-icons/pi";
import { PiArrowBendDownLeftThin } from "react-icons/pi";
import { useEffect, useState } from 'react';
import Search from '../Search/Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [animation, setAnimation] = useState(false);
  
  useEffect(() => {
    setAnimation(false)
    setAnimation(true)
  }, [])
  
  return (
    <header className={style.header}>
      <img onClick={()=> navigate('/')} className={animation ? style.logo_active : style.logo} src={logo} alt="" />
      {location.pathname === '/'
        ?
        <>
          <Search />
          <Link to='/cart'>
            <PiShoppingCartThin className={style.cart} />
          </Link>
        </>
        :
        <PiArrowBendDownLeftThin onClick={() => navigate(-1)} className={style.cart} />
      }
    </header>
  )
}

export default Header;