import { useState } from "react";

const ratingNumbers = [1, 2, 3, 4, 5];

export default function ReviewForm({lessonId, onSuccess}) {
    const [review, setReview] = useState({author_name: "", text: "", rating: null});
    const [errorReviewForm, setErrorReviewForm] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorReviewForm(null);
        try {
            const response = await fetch(`http://localhost:3000/lessons/${lessonId}/reviews`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(review)});
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }
            onSuccess();
            setReview({author_name: "", text: "", rating: null})
        } catch(error) {
            setErrorReviewForm(error.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
            <form className="review-form" onSubmit={handleSubmit}>

                            <div className="review-form__field">
                                <label className="review-form__label" htmlFor="author_name">
                                Ihr Name
                                </label>
                                <input
                                id="author_name"
                                className="review-form__input"
                                placeholder="z. B. Anna"
                                value={review.author_name}
                                onChange={(event) =>
                                    setReview({ ...review, author_name: event.target.value })
                                }
                                />
                            </div>

                            <div className="review-form__field">
                                <label className="review-form__label" htmlFor="review_text">
                                Ihre Bewertung
                                </label>
                                <textarea
                                id="review_text"
                                className="review-form__textarea"
                                placeholder="Schreiben Sie Ihre Bewertung..."
                                value={review.text}
                                onChange={(event) =>
                                    setReview({ ...review, text: event.target.value })
                                }
                                />
                            </div>

                            <div className="review-form__field">
                                <span className="review-form__label">Bewertung</span>
                                <div className="review-form__rating-list">
                                {ratingNumbers.map((ratingNumber) => {
                                    const isSelected = review.rating === ratingNumber;

                                    return (
                                    <label key={ratingNumber} className="review-form__rating-item">
                                        <input
                                        type="radio"
                                        className="review-form__rating-radio"
                                        checked={isSelected}
                                        value={ratingNumber}
                                        onChange={(event) =>
                                            setReview({ ...review, rating: Number(event.target.value) })
                                        }
                                        />
                                        <span
                                        className={`review-form__rating-badge ${
                                            isSelected ? "review-form__rating-badge--selected" : ""
                                        }`}
                                        >
                                        {ratingNumber}
                                        </span>
                                    </label>
                                    );
                                })}
                                </div>
                            </div>

                            {errorReviewForm && <span className="review-form__error">Etwas ist schiefgelaufen, versuchen Sie es nochmal!</span>}
                            
                            <button className="review-form__submit-button" type="submit" disabled={isSubmitting}>
                                Senden
                            </button>
            </form>
    )
}

