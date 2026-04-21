import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function Quote() {
    const [quote, setQuote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchQuote() {
            try {
                const quoteURL = "https://dummyjson.com/quotes/random";
                const respQuote = await fetch(quoteURL);
                const quoteResult = await respQuote.json();
                const englishQuote = quoteResult.quote;
                const author = quoteResult.author;

                const translaterURL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishQuote)}&langpair=en|de`
                const respTranslated = await fetch(translaterURL);
                const translatedResult = await respTranslated.json();
                const endResult = translatedResult.responseData.translatedText;


                setQuote({quote: endResult, author: author});
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        };

        fetchQuote()
    }, []);

    if (isLoading) return <Loader/>;
    if (!quote) return null

    return (
        <div className="quote-box">
            <p className="quote-text">"{quote.quote}"</p>
            <cite className="quote-author">- {quote.author}</cite>
        </div> 
    )
}