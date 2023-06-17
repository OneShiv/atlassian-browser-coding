import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
      if (resp.status !== "error") {
        setNewsData(newsData.concat(...resp.articles));
        page++;
      } else {
        setFetchError(resp.message);
      }
      setLoading(false);
    });
}

function NewsListLib() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [page, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(setNewsData, newsData, setLoading, setFetchError);
  }, []);

  if (!newsData.length) {
    return <div>Loading ...</div>;
  }
  return (
    <InfiniteScroll
      dataLength={newsData.length}
      next={() => fetchData(setNewsData, newsData)}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {newsData.map((news, index) => (
        <NewsCard key={news.title} {...news} />
      ))}
    </InfiniteScroll>
  );
}

export default NewsListLib;
