import SubjectCard from "./components/SubjectCard.jsx";

const testSubject = {
    id: "math",
    title: "Mathematik",
    subtitle: "Zahlen, Formeln, logisches Denken"
}

function App() {
  return (
    <ul>
        <SubjectCard subject={testSubject} isFav={false} />
    </ul>
  )
}

export default App
