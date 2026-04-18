import Footer from "./components/Footer.jsx";
import SubjectCard from "./components/SubjectCard.jsx";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SubjectPage from "./pages/SubjectPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";

function App() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("v-education_favorites")) || []);
    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    function toggleFavorites(id) {
        const newFavorites = favorites.includes(id)
        ? favorites.filter(favorite => favorite !== id)
        : [...favorites, id];

        setFavorites(newFavorites);
        localStorage.setItem('v-education_favorites', JSON.stringify(newFavorites));
    }


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

  return (
    <BrowserRouter>
      <Header favCount={favorites.length} subjects={subjects} isLoading={isLoading}/>
      <Routes>
        <Route path="/" element={<HomePage subjects={subjects} isLoading={isLoading} favorites={favorites} toggleFavorites={toggleFavorites}/>}/>
        <Route path="/subject/:subjectId" element={<SubjectPage/>}/>
        <Route path="/subject/:subjectId/lesson/:lessonId" element={<LessonPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
