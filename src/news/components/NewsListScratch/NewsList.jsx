import { useState, useEffect, useRef, useCallback } from "react";
import NewsCard from "../NewsCard";
import { EVERYTHING_URL, ONE_ARTICLE_HEIGHT } from "../../../constants";

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
      document.documentElement.offsetHeight - ONE_ARTICLE_HEIGHT
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
        const req = await fetch(`${EVERYTHING_URL}${page}`);
        const response = await req.json();
        if (response.status !== "error") {
          setNewsData(newsData.concat(response.articles));
          window.scrollTo({
            top: lastScrolledRef.current,
            behavior: "smooth",
          });
        } else {
          setFetchError(response.message);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setFetchError({
          error: err,
        });
      }
    })();
  }, [page]);

  return (
    <div className="News">
      {newsData.map((news, index) => (
        <NewsCard key={news.title} {...news} />
      ))}
      {loading && <div>Loading....</div>}
      {fetchError && <div>Facing issue getting data</div>}
    </div>
  );
}

export default NewsList;
