import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Quotebox = () => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const getAndSetNewQuote = async () => {
    setLoading(true);
    const response = await fetch(
      "https://quote-garden.herokuapp.com/api/v2/quotes/random"
    );
    const quote = await response.json();
    setQuote(quote.quote.quoteText);
    setAuthor(quote.quote.quoteAuthor);
    setLoading(false);
  };
  useEffect(() => {
    getAndSetNewQuote();
  }, []);

  return (
    <div id="quote-box">
      {loading ? (
        <ClipLoader />
      ) : (
        <div>
          <p id="text">{quote}</p>
          {!!author && <p id="author">- {author}</p>}
        </div>
      )}
      <div>
        <a
          href={`https://twitter.com/intent/tweet?text=${quote}`}
          id="tweet-quote"
        >
          Tweet
        </a>
        <button id="new-quote" onClick={getAndSetNewQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
};

type Quote = {
  _id: string;
  quoteText: string;
  quoteAuthor: string;
};
export default Quotebox;
