import SubjectCard from "../components/SubjectCard";
import { useState } from "react";
import Search from "../components/Search";
import Categroies from "../components/Categories";
import { useFetch } from "../hooks/useFetch";
import Faq from "../components/Faq";

export default function HomePage({subjects, isLoading, favorites, toggleFavorites}) {
    const [searchQuery, setSearchQuery] = useState("");
    const categories = ["Alle", ...new Set(subjects.map(subject => subject.category))];
    const [activeCategory, setActiveCategory] = useState("Alle");
    const {data: faqData, isLoading: isFaqLoading} = useFetch("http://127.0.0.1:3658/m1/1236529-1233135-default/faq");

    const filteredSubjects = subjects
    .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(s => activeCategory === "Alle" || s.category === activeCategory)

    return (
        <div className="container">
            <section className="hero">
                <h1 className="hero__title">Bereite dich effektiv auf die Prüfung vor.</h1>
                <Categroies categories={categories} activeCategory={activeCategory} onCategoryClick={setActiveCategory}/>
                <p className="hero__subtitle">Lerne bequem von zu Hause mit Videos – effektiv, einfach und schnell zum Prüfungserfolg.</p>
            </section>

            <section className="subjects-preview">
                <h2 className="subjects-preview__title">Alle Lernfächer</h2>
                <Search searchQuery={searchQuery} onSearch={setSearchQuery}/>
                {isLoading ? <p>Wird geladen...</p> : 
                    filteredSubjects.length === 0 && searchQuery  
                        ? (
                            <div className="search-emty">
                                <p className="search-emty__title">Nach der Suche von {searchQuery} wurde nichts gefunden</p>
                                <button id="resetSearch" className="button search-emty__button" onClick={() => setSearchQuery("")}>Zurücksetzten</button>
                            </div>
                        )
                        : 
                        <ul className="subjects-preview__list">
                            {
                                filteredSubjects.map(subject => (
                                    <SubjectCard
                                        key={subject.id}
                                        subject={subject}
                                        isFav={favorites.includes(subject.id)}
                                        onFavoriteClick={() => toggleFavorites(subject.id)}
                                    />
                                ))
                            }
                        </ul>}
            </section>
            {isFaqLoading ? <p>wird geladen...</p> : <Faq faqData={faqData}/>}
        </div>
  )
}