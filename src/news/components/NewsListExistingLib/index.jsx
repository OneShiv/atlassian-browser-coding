import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "../NewsCard";
import { EVERYTHING_URL } from "../../../constants";
// can we move this data to a hook?
// imp part is maintaining of page , how we can do it.
// right now kept individual version for simplicity
let page = 1;

function fetchData(setNewsData, newsData, setLoading, setFetchError) {
  setLoading(true);
  setFetchError("");
  fetch(`${EVERYTHING_URL}${page}`)
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

  useEffect(() => {
    fetchData(setNewsData, newsData, setLoading, setFetchError);
  }, []);

  return (
    <InfiniteScroll
      dataLength={newsData.length}
      next={() => fetchData(setNewsData, newsData, setLoading, setFetchError)}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {newsData.map((news, index) => (
        <NewsCard key={news.title} {...news} />
      ))}
      {loading && <div>Loading data</div>}
      {fetchError && <div>Error fetching data</div>}
    </InfiniteScroll>
  );
}

export default NewsListLib;
