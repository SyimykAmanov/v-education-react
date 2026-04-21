export default function Skeleton({count}) {

    return (
        <>
            {
                Array(count).fill(null).map((_, index) => 
                    (<li key={index} className="subjects-preview__item">
                        <div className="card skeleton-card">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-description"></div>
                            <div className="skeleton-button"></div>
                        </div>
                    </li>)
                )
            }
        </>
    )
}