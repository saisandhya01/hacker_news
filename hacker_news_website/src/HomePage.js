import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./components/NewsCard";
import ReactPaginate from "react-paginate";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://hn.algolia.com/api/v1/search?",
          {
            params: { page: currentPage, query },
          }
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
  }, [currentPage, query]);
  const handlePageChange = (event) => {
    console.log(event);
    setCurrentPage(event.selected);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(searchInput);
    setCurrentPage(0);
  };
  return (
    <div className="container">
      <h1>Hacker news clone</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          placeholder="Search stories"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
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
        className="pagination"
        nextLabel="Next"
        previousLabel="Previous"
        breakLabel="..."
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        activeClassName="active-page"
        previousClassName="previous-page"
        nextClassName="next-page"
      />
    </div>
  );
};

export default HomePage;
