import { Link, useLocation } from 'react-router-dom'; 
import logoPath from '../images/logo.svg';

function Header (props) {
  
  const location = useLocation().pathname;

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип"></img>
      {!props.loggedIn ? (
      <Link
        to={(location === "/sign-in") ? "/sign-up" : "/sign-in"}
        className = "header__link">
          {(location === "/sign-in") ? "Регистрация" : (location === "/sign-up") && "Вход"}
      </Link>
      ) : (
      <div className="header__rightside-block">
      <p className="header__link">{props.email}</p>
      <Link
          to="/sign-in"
          className="header__link header__link_type_exit"
          onClick={props.onExit}>Выйти</Link>  
      </div>    
      )}

    </header>
  )
}

export default Header;