import Footer from "./components/Footer.jsx";
import SubjectCard from "./components/SubjectCard.jsx";
import { useState } from "react";
import Header from "./components/Header.jsx";

const testSubjects = [{
    id: "math",
    title: "Mathematik",
    subtitle: "Zahlen, Formeln, logisches Denken"
}]

function App() {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("v-education_favorites")) || []);

  function toggleFavorites(id) {
    const newFavorites = favorites.includes(id)
    ? favorites.filter(favorite => favorite !== id)
    : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem('v-education_favorites', JSON.stringify(newFavorites));
  }

  return (
    <div>
      <Header favCount={favorites.length} subjects={testSubjects} />
      <ul>
        <SubjectCard subject={testSubjects[0]} isFav={favorites.includes(testSubjects[0].id)} onFavoriteClick={() => toggleFavorites(testSubjects[0].id)}/>
      </ul>
      <Footer/>
    </div>
  )
}

export default App
