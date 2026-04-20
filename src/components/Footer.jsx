import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">

                <div className="footer__brand">
                    <Link to="/" className="logo footer__logo">
                        <img className="logo__img dark-theme" src="/assets/img/logo.png" alt="logo"/>
                    </Link>
                    <p className="footer__copy">&copy; 2026 v-education</p>
                </div>

                <div className="footer__contacts">
                    <a href="tel:+491520700800" className="footer__tel">+49 1520 700 800</a>
                    <a href="v-education@veducation.de<" className="footer__email">v-education@veducation.de</a>
                </div>

            </div>
        </footer>
    )
}

