import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function SubjectPage({subjects}) {
    const {subjectId} = useParams();
    const [lessons, setLessons] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const subject = subjects.find(subject => (subject.id === subjectId));

    useEffect(() => {
        async function fetchLessons() {
            try {
              const lessonsURL = "http://127.0.0.1:3658/m1/1236529-1233135-default/lessons";
              const response = await fetch(lessonsURL);
              if (response.ok) {
                const result = await response.json();
                const subjectLessons = result.lessons.filter(lesson => lesson.subjectId === subjectId);
                setLessons(subjectLessons);
                setLoading(false);
              }
            } catch (error) {
              console.error(error);
            }
        };

        fetchLessons()
    }, [])

    if (!subject) return <p>Wird geladen...</p>
    
    return (
        <div className="container">
            <section className="hero-sections">
            <h1 className="hero-sections__title">{subject.title}</h1>
            <p className="hero-sections__subtitle">{subject.subtitle ?? ""}</p>
            </section>

            <section className="lessons-preview">
            <h2 className="lessons-preview__title">Lektionsliste</h2>
            {
                isLoading ? <p>Wird geladen ...</p> : (
                    <ul className="lessons-preview__items">
                        {lessons.map(lesson => 
                            <li key={lesson.id}>{lesson.title}</li>
                        )}
                    </ul>
                )
            }
            </section>
        </div>
    )
}