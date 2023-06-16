import { timeDifference } from "../utils";
import "./NewsCard.css";

function NewsCard({ author, title, description, urlToImage, publishedAt }) {
  // why article here because each piece is independent
  return (
    <article className="newsArticle">
      <aside className="newsArticle-image">
        <img src={urlToImage} alt={description} />
      </aside>
      <div className="newsArticle-content">
        <div className="newsArticle-content-text">
          <h6>{title}</h6>
          <p>{description}</p>
        </div>
        <div className="newsArticle-content-author">
          <span>
            <em>
              By {author} |{" "}
              {timeDifference(Date.now(), new Date(publishedAt).getTime())}
            </em>
          </span>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
