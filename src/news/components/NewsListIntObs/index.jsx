import { useState, useEffect, useRef, useCallback } from "react";
import NewsCard from "../NewsCard";

let page = 1;

function fetchData(setNewsData, newsData, setLoading, setFetchError) {
  setLoading(true);
  setFetchError("");
  fetch(
    `https://newsapi.org/v2/everything?q=twitter&apiKey=d95d49440e324a6381a45a5f7dacac66&pageSize=30&page=${page}`
  )
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      console.log("obs", resp);
      if (resp.status !== "error") {
        setNewsData(newsData.concat(...resp.articles));
        page++;
      } else {
        setFetchError(resp.message);
      }
      setLoading(false);
    });
}

function NewsListIntObs() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const lastElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(setNewsData, newsData, setLoading, setFetchError);
        }
      },
      {
        threshold: 1,
      }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [lastElementRef]);

  return (
    <div className="News">
      {newsData.map((news, index) => (
        <NewsCard
          key={news.title}
          {...news}
          ref={index === newsData.length - 1 ? lastElementRef : null}
        />
      ))}
      {loading && <div>Loading....</div>}
      {fetchError && <div>Facing issue getting data</div>}
      <div ref={lastElementRef}></div>
    </div>
  );
}

export default NewsListIntObs;
