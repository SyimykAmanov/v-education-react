import Button from "../components/Button";
import SubjectCard from "../components/SubjectCard";

export default function HomePage({subjects, isLoading, favorites, toggleFavorites}) {

    return (
        <div className="container">
            <section className="hero">
              <h1 className="hero__title">Bereite dich effektiv auf die Prüfung vor.</h1>
              <p className="hero__subtitle">Lerne bequem von zu Hause mit Videos – effektiv, einfach und schnell zum Prüfungserfolg.</p>
            </section>

            <section className="subjects-preview">
                <h2 className="subjects-preview__title">Alle Lernfächer</h2>
                    {isLoading ? <p>Wird geladen...</p> : 
                    <ul className="subjects-preview__list">
                        {subjects.map(subject => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            isFav={favorites.includes(subject.id)}
                            onFavoriteClick={() => toggleFavorites(subject.id)}
                            />
                        ))}
                    </ul>}
            </section>
        </div>
  )
}