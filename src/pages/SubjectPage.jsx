import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import SubjectSkeleton from "../components/Skeleton";
import Skeleton from "../components/Skeleton";
import Loader from "../components/Loader";


export default function SubjectPage({subjects, completedLessons}) {
    const {subjectId} = useParams();
    const subject = subjects.find(subject => (subject.id === subjectId));

    const {data, isLoading} = useFetch("http://localhost:3000/lessons");

    if(isLoading) return <Loader/>
    const lessons = data.lessons.filter(lesson => lesson.subject_id === subjectId);

    return (
        <div className="container">
            <section className="hero-sections">
            <h1 className="hero-sections__title">{subject.title}</h1>
            <p className="hero-sections__subtitle">{subject.subtitle ?? ""}</p>
            </section>

            <section className="lessons-preview">
            <h2 className="lessons-preview__title">Lektionsliste</h2>
                <ul className="lessons-preview__items">
                    {isLoading 
                    ? <Skeleton count={4}/>
                    : lessons.map(lesson => 
                        <li className="card lesson-preview" key={lesson.id}>
                            <h3 className="card__title">{lesson.title} {completedLessons.includes(lesson.id) ? '✅' : ''}</h3>
                            <p className="card__description">{lesson.description}</p>
                            <Link className="card__link" to={`/subject/${lesson.subject_id}/lesson/${lesson.id}`}>Lektion öffnen</Link>
                        </li>
                    )}
                </ul>
            </section>
        </div>
    )
}
