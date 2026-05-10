import { Link } from "react-router-dom";
export default function ErrorMessage({resourceName = "Die Ressource", toHomePage = true}) {
    return (
        <div className="error-page-wrapper">
            <div className="error-card">
                <span className="error-icon" role="img" aria-label="error">⚠️</span>
                
                <p className="error-text">
                    {resourceName} nicht gefunden oder Server ist nicht verfügbar.
                </p>
                
                {toHomePage && (
                    <Link to="/" className="error-button">
                        Zurück zur Startseite
                    </Link>
                )}
            </div>
        </div>
    )
}