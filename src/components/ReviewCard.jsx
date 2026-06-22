export default function ReviewCard({review}) {
    const date = new Date(review.created_at);
    const formattedDate = date.toLocaleDateString('de-DE');
    const formattedTime = date.toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"});

    return (
        <div className="review-card">
            <div className="review-card__author">
                <p>{review.author_name}</p>
            </div>
            <div className="review-card__rating">
                <p>{review.rating} von 5</p>
            </div>
            <div className="review-card__text">
                <p>{review.text}</p>
            </div>
            <div className="review-card__time">
                <p>{formatedTime} {formatedDate}</p>
            </div>
        </div>
    )
}