import SubjectCard from "./SubjectCard";

export default function Search({searchQuery, onSearch}) {
    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Fachsuche..."
                value={searchQuery}
                onChange={(event) => onSearch(event.target.value)}
            />
        </div>
    )
}