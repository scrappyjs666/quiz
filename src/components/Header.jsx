function Header() {
  return (
    <header>
    <div className="container">
      <nav className="nav">
        <a href="/*" className="nav__logo">
          <img src="logo.png" alt="logo" />
        </a>
        <div className="nav__links">
          <a href="/*" className="nav__link">home</a>
          <a href="/*" className="nav__link">seance</a>
          <a href="/*" className="nav__link">reviews</a>
          <a href="/*" className="nav__link">contacts</a>
          <a href="/*" className="nav__link">news</a>
          <a href="/*" className="nav__link">about me</a>
          <a href="/*" className="nav__link">blog</a>
        </div>
        <button className="nav__button">Sign up for a session</button>
      </nav>
    </div>
    </header>
    
  );
}

export default Header;