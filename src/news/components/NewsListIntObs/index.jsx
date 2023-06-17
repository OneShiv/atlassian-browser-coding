import { useState, useEffect, useRef } from "react";
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
        <NewsCard key={news.title} {...news} />
      ))}
      {loading && <div>Loading....</div>}
      {fetchError && <div>Facing issue getting data</div>}
      <div ref={lastElementRef}></div>
    </div>
  );
}

export default NewsListIntObs;
