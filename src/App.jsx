import Footer from "./components/Footer.jsx";
import SubjectCard from "./components/SubjectCard.jsx";
import { useState } from "react";
import Header from "./components/Header.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SubjectPage from "./pages/SubjectPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import { useFetch } from "./hooks/useFetch.js";

function App() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("v-education_favorites")) || []);
    
    function toggleFavorites(id) {
        const newFavorites = favorites.includes(id)
        ? favorites.filter(favorite => favorite !== id)
        : [...favorites, id];

        setFavorites(newFavorites);
        localStorage.setItem('v-education_favorites', JSON.stringify(newFavorites));
    }

    const { data, isLoading } = useFetch("http://127.0.0.1:3658/m1/1236529-1233135-default/subjects");
    
    if (isLoading) {
      return <p>Wird geladen ...</p>
    }

    const subjects = data.subjects;



    

  return (
    <BrowserRouter>
      <Header favCount={favorites.length} subjects={subjects} isLoading={isLoading}/>
      <Routes>
        <Route path="/" element={<HomePage subjects={subjects} isLoading={isLoading} favorites={favorites} toggleFavorites={toggleFavorites}/>}/>
        <Route path="/subject/:subjectId" element={<SubjectPage subjects={subjects}/>}/>
        <Route path="/subject/:subjectId/lesson/:lessonId" element={<LessonPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
