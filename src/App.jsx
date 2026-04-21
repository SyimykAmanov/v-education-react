import Footer from "./components/Footer.jsx";
import { useState } from "react";
import Header from "./components/Header.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SubjectPage from "./pages/SubjectPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import { useFetch } from "./hooks/useFetch.js";

function App() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("v-education_favorites")) || []);
    const [completedLessons, setCompletedLessons] = useState(JSON.parse(localStorage.getItem("v-education_completed")) || []);
    
    function toggleFavorites(id) {
        const newFavorites = favorites.includes(id)
        ? favorites.filter(favorite => favorite !== id)
        : [...favorites, id];

        setFavorites(newFavorites);
        localStorage.setItem('v-education_favorites', JSON.stringify(newFavorites));
    }

    function toggleCompleted(id) {
        const newCompletedLessons = completedLessons.includes(id) 
        ? completedLessons.filter(completedLesson => completedLesson!== id)
        : [... completedLessons, id];

        setCompletedLessons(newCompletedLessons);
        localStorage.setItem('v-education_completed', JSON.stringify(newCompletedLessons));
    }

    const { data, isLoading } = useFetch("http://127.0.0.1:3658/m1/1236529-1233135-default/subjects");
    const subjects = isLoading ? [] : data.subjects;

  return (
    <BrowserRouter>
      <Header favCount={favorites.length} subjects={subjects} isLoading={isLoading}/>
      <Routes>
        <Route path="/" element={<HomePage subjects={subjects} isLoading={isLoading} favorites={favorites} toggleFavorites={toggleFavorites}/>}/>
        <Route path="/subject/:subjectId" element={<SubjectPage subjects={subjects} completedLessons={completedLessons}/>}/>
        <Route path="/subject/:subjectId/lesson/:lessonId" element={<LessonPage completedLessons={completedLessons} toggleCompleted={toggleCompleted}/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
