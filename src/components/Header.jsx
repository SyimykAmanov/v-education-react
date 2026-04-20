import { Link } from "react-router-dom"

export default function Header({favCount, subjects, isLoading}) {
    return (
        <header className="header">
            <div className="header__container"> 

                <div className="header__info">
                    <Link to="/" className="logo header__logo">
                        <img className="logo__img" src="/assets/img/logo.png" alt="logo"/>
                    </Link>
                    <div className="header__favorites">
                        <span className="nav__fav-count">Lieblingsfächer: {favCount}</span>
                    </div>
                </div>


                <nav className="header__nav">
                    {!isLoading && (
                        <ul className="header__menu">
                            {subjects.map(subject => (
                                <li className="header__menu-item" key={subject.id}>
                                    <Link to={`/subject/${subject.id}`} className="header__menu-link">{subject.title}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
                
            </div>
        </header>
    )
}