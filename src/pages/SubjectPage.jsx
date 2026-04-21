import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";


export default function SubjectPage({subjects, completedLessons}) {
    const {subjectId} = useParams();
    const subject = subjects.find(subject => (subject.id === subjectId));

    const {data, isLoading} = useFetch("http://127.0.0.1:3658/m1/1236529-1233135-default/lessons");

    if (isLoading) return <p>Wird geladen...</p>

    const lessons = data.lessons.filter(lesson => lesson.subjectId === subjectId);
    return (
        <div className="container">
            <section className="hero-sections">
            <h1 className="hero-sections__title">{subject.title}</h1>
            <p className="hero-sections__subtitle">{subject.subtitle ?? ""}</p>
            </section>

            <section className="lessons-preview">
            <h2 className="lessons-preview__title">Lektionsliste</h2>
                <ul className="lessons-preview__items">
                    {lessons.map(lesson => 
                        <li className="card lesson-preview" key={lesson.id}>
                            <h3 className="card__title">{lesson.title} {completedLessons.includes(lesson.id) ? '✅' : ''}</h3>
                            <p className="card__description">{lesson.description}</p>
                            <Link className="card__link" to={`/subject/${lesson.subjectId}/lesson/${lesson.id}`}>Lektion öffnen</Link>
                        </li>
                    )}
                </ul>
            </section>
        </div>
    )
}
