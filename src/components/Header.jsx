export default function Header({favCount, subjects}) {
    return (
        <header className="header">
            <div className="header__container"> 

                <div className="header__info">
                    <a href="/" className="logo header__logo">
                        <img className="logo__img" src="/assets/img/logo.png" alt="logo"/>
                    </a>
                    <div className="header__favorites">
                        <span className="nav__fav-count">Lieblingsfächer: {favCount}</span>
                    </div>
                </div>


                <nav className="header__nav">
                    <ul className="header__menu">
                        {subjects.map(subject => {
                            return(
                                <li className="header__menu-item" key={subject.id}>
                                    <a href={`/subject/${subject.id}`} className="header__menu-link">{subject.title}</a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                
            </div>
        </header>
    )
}