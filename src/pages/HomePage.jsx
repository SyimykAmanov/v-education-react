import SubjectCard from "../components/SubjectCard";
import { useState } from "react";
import Search from "../components/Search";
import Categroies from "../components/Categories";
import { useFetch } from "../hooks/useFetch";
import Faq from "../components/Faq";
import Quote from "../components/Quote";
import Skeleton from "../components/Skeleton";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage({subjects, isLoading, favorites, toggleFavorites, subjectError}) {
    const [searchQuery, setSearchQuery] = useState("");
    const categories = ["Alle", ...new Set(subjects.map(subject => subject.category))];
    const [activeCategory, setActiveCategory] = useState("Alle");

    const {data: faqData, isLoading: isFaqLoading, error: faqError} = useFetch("http://localhost:3000/faq");
    


    const filteredSubjects = subjects
    .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(s => activeCategory === "Alle" || s.category === activeCategory)

    function renderSubjectsList() {
        if (isLoading) return (
            <ul className="subjects-preview__list">
                        <Skeleton count={8} />
            </ul>
        )

        if (subjectError) return <ErrorMessage resourceName="Die Fächer wurden" toHomePage={false}/>

        if (filteredSubjects.length === 0 && searchQuery) return (
            <div className="search-emty">
                <p className="search-emty__title">Nach der Suche von {searchQuery} wurde nichts gefunden</p>
                <button id="resetSearch" className="button search-emty__button" onClick={() => setSearchQuery("")}>Zurücksetzten</button>
            </div>)

        return (
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
            </ul>)
    }

    function renderFaq() {
        if (isFaqLoading) return (
           <Skeleton count={2} /> 
        )
        if (faqError) return (
           <ErrorMessage resourceName="FAQ wurde" toHomePage={false}/>
        )
        return (
            <Faq faqData={faqData.faq}/>
        )
    }

    return ( 
        <div className="container">
            <section className="hero">
                <h1 className="hero__title">Bereite dich effektiv auf die Prüfung vor.</h1>
                <Categroies categories={categories} activeCategory={activeCategory} onCategoryClick={setActiveCategory}/>
                <p className="hero__subtitle">Lerne bequem von zu Hause mit Videos – effektiv, einfach und schnell zum Prüfungserfolg.</p>
                <Quote/>
            </section>

            <section className="subjects-preview">
                <h2 className="subjects-preview__title">Alle Lernfächer</h2>
                <Search searchQuery={searchQuery} onSearch={setSearchQuery}/>
                {renderSubjectsList()}
            </section>
            {renderFaq()}
        </div>
  )
}