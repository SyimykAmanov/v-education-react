import Footer from "./components/Footer.jsx";
import SubjectCard from "./components/SubjectCard.jsx";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";

function App() {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("v-education_favorites")) || []);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const subjectURL = "http://127.0.0.1:3658/m1/1236529-1233135-default/subjects";
        const response = await fetch(subjectURL);
        if (response.ok) {
          const result = await response.json();
          setSubjects(result.subjects);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, [])

  function toggleFavorites(id) {
    const newFavorites = favorites.includes(id)
    ? favorites.filter(favorite => favorite !== id)
    : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem('v-education_favorites', JSON.stringify(newFavorites));
  }

  if (subjects.length === 0) return <p>Wird geladen...</p>

  return (
    <div>
        <Header favCount={favorites.length} subjects={subjects} />
        {isLoading ? <p>Wird geladen...</p> : (
            <ul>
                {subjects.map(subject => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                        isFav={favorites.includes(subject.id)}
                        onFavoriteClick={() => toggleFavorites(subject.id)}
                    />
                ))}
            </ul>
        )}
        <Footer />
    </div>
  )
}

export default App
