import Button from "./Button.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SubjectCard({subject, isFav, onFavoriteClick}) {

    return (
        <li className="subjects-preview__item" data-subject-id={subject.id}>
            <article className="card subject-card">
                <h3 className="card__title subject-card__title">{subject.title}</h3>
                <p className="card__description subject-card__description">{subject.subtitle}</p>
                <Button 
                    text={"favorite"}
                    className={`favorite__button button ${isFav ? 'active' : ''}`}
                    onClick={onFavoriteClick}
                    icon={isFav ? '★' : '☆'}
                />
                <Link to={`/subject/${subject.id}`} className="card__link">Zu den Lektionen</Link>
            </article>
        </li>
    )
}   