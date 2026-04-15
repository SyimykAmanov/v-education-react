export default function Button({className, id, dataId, icon, text, onClick}) {
    return (
        <button className={className} id={id} data-id={dataId} onClick={onClick}>
            {icon ? <span className="button__icon">{icon}</span> : ""}
            <span className="button__text">{text}</span>
        </button>
    )
}