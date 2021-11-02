import axiosConfig from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import Article from "../../components/Article/Article";
import "./Articles.css";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ReactPaginate from "react-paginate";

const Articles = () => {
	const [articles, setArticles] = useState([]);
	const [handleLoader, setHandleLoader] = useState(false);
	const articlesPerPage = 10;
	const [pageOffset, setPageOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);

	const getArticles = () => {
		setHandleLoader(true);
		axiosConfig
			.get(
				`/articles?${new URLSearchParams({
					_limit: articlesPerPage,
					_start: pageOffset * articlesPerPage,
				})}`
			)
			.then((response) => {
				setArticles(response.data);
				setHandleLoader(false);
			});
	};

	const getArticlesCount = () => {
		axiosConfig.get("articles/count").then((response) => {
			setPageCount(Math.ceil(response.data / articlesPerPage));
		});
	};

	useEffect(() => {
		getArticlesCount();
	}, []);

	useEffect(() => {
		getArticles();
		// eslint-disable-next-line
	}, [pageOffset, articlesPerPage]);

	const handlePageChange = (event) => {
		setPageOffset(event.selected);
	};

	const handleFiveChange = (inp) => {
		if (inp === "plusFive" && pageOffset < pageCount - 6) {
			setPageOffset((prev) => prev + 5);
		} else if (inp === "minusFive" && pageOffset > 6) {
			setPageOffset((prev) => prev - 5);
		}
	};

	return (
		<div className="articles">
			{handleLoader && <CustomLoader />}
			<p>The Space Flight Articles</p>
			<div className="articleCards">
				{articles.map((article) => (
					<Article key={article.id} article={article} />
				))}
			</div>
			<div>
				<p onClick={() => handleFiveChange("minusFive")} className={pageOffset < 6 ? "btnDisabled" : ""}>
					-5
				</p>
				<ReactPaginate
					previousLabel="Previous"
					nextLabel="Next"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					previousClassName="page-item"
					previousLinkClassName="prev-btn"
					nextClassName="page-item"
					nextLinkClassName="next-btn"
					breakLabel="..."
					breakClassName="page-item"
					breakLinkClassName="page-link"
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName="pagination"
					activeClassName="active"
					forcePage={pageOffset}
				/>
				<p
					onClick={() => handleFiveChange("plusFive")}
					className={pageOffset > pageCount - 6 ? "btnDisabled" : ""}
				>
					+5
				</p>
			</div>
		</div>
	);
};

export default Articles;
