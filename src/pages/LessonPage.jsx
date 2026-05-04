import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Homework from "../components/Homework";
import Loader from "../components/Loader";

export default function LessonPage({completedLessons, toggleCompleted}) {
    const {subjectId, lessonId} = useParams();
    const {data, isLoading} = useFetch(`http://localhost:3000/subjects/${subjectId}/lessons/${lessonId}`);

    if(isLoading) return <Loader/>
    
    const lesson = data.lesson;

    if (!lesson) return <p>Урок не найден</p>;
    
    const isCompleted = completedLessons.includes(lesson.id);
    
    return (
        <article className="lesson">
            <div className="lesson__header">
            <h1 className="lesson__title">{lesson.order}. {lesson.title}</h1>
            <button className={`button completed-button ${isCompleted ? "active": ""}`} onClick={() => toggleCompleted(lesson.id)}> 
                {isCompleted ? "Erledigt": "als abgeschlossen markieren"}
            </button>
            </div>

            <div className="lesson__video">
                <iframe className="lesson__iframe"
                    src={lesson.video_url}
                    frameBorder="0"
                    allowFullScreen>
                </iframe>
            </div>

            <div className="lesson__description">
                <h2 className="lesson__subtitle">Lektionbeschreibung</h2>
                <p className="lesson__text">{lesson.description}</p>
            </div>
            <Homework tasks={lesson.homework}/>
        </article>
    )
}
