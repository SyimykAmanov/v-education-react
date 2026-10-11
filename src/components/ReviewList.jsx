import ReviewCard from "./ReviewCard"

export default function ReviewList({ reviews }) {
    if (reviews.length === 0) {
        return (
            <div className="review-list__empty">
                <p className="review-list__empty-text">Es gibt bis jetzt keine Bewertungen. Schreib erste Bewertung</p>
            </div>
        )
    }
    return (
        <div className="review-list">
            {reviews.map(review => <ReviewCard review={review} key={review.id}/>)}
        </div>
    );
}