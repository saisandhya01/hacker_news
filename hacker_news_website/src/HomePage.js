import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./components/NewsCard";
import ReactPaginate from "react-paginate";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://hn.algolia.com/api/v1/search?"
        );
        const { hits, nbPages } = data;
        setArticles(hits);
        setTotalPages(nbPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <h1>Hacker news clone</h1>
      <div className="news-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          articles.map((article) => (
            <NewsCard article={article} key={article.objectID} />
          ))
        )}
      </div>
      <ReactPaginate
        nextLabel=">>"
        previousLabel="<<"
        breakLabel="..."
        forcePage={currentPage}
      />
    </div>
  );
};

export default HomePage;
