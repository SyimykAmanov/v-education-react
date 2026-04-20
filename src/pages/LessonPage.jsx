import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function LessonPage({completedLessons, toggleCompleted}) {
    const {subjectId, lessonId} = useParams();
    const {data, isLoading} = useFetch("http://127.0.0.1:3658/m1/1236529-1233135-default/lessons");

    if (isLoading) {
        return <p>Wird geladen...</p>
    }

    const lessons = data.lessons;
    const lesson = lessons.find(lesson => lesson.id == lessonId && lesson.subjectId == subjectId);

    if (!lesson) {
        return <p>Урок не найден</p>;
    }

    const isCompleted = completedLessons.includes(lesson.id);
    
    return (
        <article className="lesson">
            <div className="lesson__header">
            <h1 className="lesson__title">{lesson.order}. {lesson.title}</h1>
            <button className={`button completed-button ${isCompleted ? "active": ""}`} data-id={lesson.id} onClick={() => toggleCompleted(lesson.id)}> 
                {isCompleted ? "Erldeigt": "als abgeschlossen markieren"}
            </button>
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
