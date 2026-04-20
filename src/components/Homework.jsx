export default function Homework({tasks}) {
    const taskList = tasks ?? [];
    const homeWorkList = taskList.length ? taskList.map(homework => <li key={homework.task}>{homework.task}</li>) : <li>Keine Hausaufgaben</li>;
    
    return (
        <div className="lesson__homework">
            <h3 className="lesson__homework-title">Hausaufgaben:</h3>
            <ul className="lesson__homework-list">
                {homeWorkList}
            </ul>
        </div>
    )
}