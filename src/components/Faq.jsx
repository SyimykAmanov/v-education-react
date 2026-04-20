export default function Faq({faqData}) {

    return (
        <section className="faq">
            <h3 className="faq__title">Häufig gestellte Fragen</h3>
            {faqData.map(faq => 
                <details key={faq.question} className="faq__item">
                    <summary className="faq__question">{faq.question}</summary>
                    <p className="faq__answer">{faq.answer}</p>
                </details>
            )}
        </section>
    )
}