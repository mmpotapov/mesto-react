import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <a href="#0" className="header__logo-link">
        <img alt="Логотип" src={logo} className="header__logo" />
      </a>
    </header>
  )
}

export default Header;
