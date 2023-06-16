import { useState, useEffect, useRef, useCallback } from "react";
import NewsCard from "../NewsCard";

function NewsList() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [page, setCurrentPage] = useState(1);
  const lastScrolledRef = useRef(0);
  const handleScroll = useCallback(function () {
    lastScrolledRef.current =
      window.innerHeight + document.documentElement.scrollTop;
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setCurrentPage((page) => page + 1);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    (async function getNewsData() {
      try {
        setLoading(true);
        const req = await fetch(
          `https://newsapi.org/v2/everything?q=twitter&apiKey=d95d49440e324a6381a45a5f7dacac66&pageSize=30&page=${page}`
        );
        const response = await req.json();
        setNewsData(newsData.concat(response.articles));
        window.scrollTo({
          top: lastScrolledRef.current,
          behavior: "smooth",
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setFetchError({
          error: err,
        });
      }
    })();
  }, [page]);

  if (fetchError) {
    return <div>Facing issue getting data</div>;
  }
  return (
    <div className="News">
      {newsData.map((news, index) => (
        <NewsCard key={news.title} {...news} />
      ))}
      {loading && <div>Loading....</div>}
    </div>
  );
}

export default NewsList;