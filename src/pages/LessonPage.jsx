import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LessonPage() {
    const {subjectId, lessonId} = useParams();
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const lesson = lessons.find(lesson => lesson.id == lessonId && lesson.subjectId == subjectId);

    useEffect(() => {
        async function fetchLessons() {
            const lessonsURL = "http://127.0.0.1:3658/m1/1236529-1233135-default/lessons";
            const response = await fetch(lessonsURL);
            const result = await response.json();
            setLessons(result.lessons);
        };

        async function fetchData() {
            await fetchLessons();
            setIsloading(false);
        }
        
        fetchData();
    }, []);

    if (isLoading) {
        return <p>Wird geladen...</p>
    }

    if (!lesson) {
        return <p>Урок не найден</p>;
    }
    
    return (
        <article className="lesson">
            <div className="lesson__header">
            <h1 className="lesson__title">{lesson.order}. {lesson.title}</h1>
            </div>

            <div className="lesson__video">
                <iframe className="lesson__iframe"
                    src={lesson.videoUrl}
                    frameBorder="0"
                    allowFullScreen>
                </iframe>
            </div>

            <div className="lesson__description">
                <h2 className="lesson__subtitle">Lektionbeschreibung</h2>
                <p className="lesson__text">{lesson.description}</p>
            </div>
        </article>
    )
}
