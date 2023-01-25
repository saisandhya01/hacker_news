const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      {article.title ? (
        <div>
          <h5>
            {article.title} <a href={article.url}>({article.url})</a>
          </h5>
          <p>
            {article.points} points | {article.author} | {article.num_comments}{" "}
            comments
          </p>{" "}
        </div>
      ) : (
        <div>
          <p>
            {article.points} points | {article.author} | {article.num_comments}
            comments
          </p>
          <p>{article.comment_text}</p>
        </div>
      )}
    </div>
  );
};
export default NewsCard;
