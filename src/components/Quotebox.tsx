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
    <div id="quote-box" className="w-6/12 bg-red-500 rounded-lg">
      <div className="p-8">
        {loading ? (
          <div className="text-center">
            <ClipLoader color="#feb2b2" />
          </div>
        ) : (
          <>
            <p className="font-sans text-xl text-gray-100 " id="text">
              {quote}
            </p>
            {!!author && (
              <p
                className="mt-1 font-serif text-lg text-right text-red-200"
                id="author"
              >
                - {author}
              </p>
            )}
          </>
        )}
        <div className="inline-block w-16 align-bottom">
          <a
            href={`https://twitter.com/intent/tweet?text=${quote}`}
            id="tweet-quote"
          >
            Tweet
          </a>
        </div>
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
