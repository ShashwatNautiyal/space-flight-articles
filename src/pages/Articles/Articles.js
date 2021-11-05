import axiosConfig from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import Article from "../../components/Article/Article";
import "./Articles.css";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ReactPaginate from "react-paginate";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Articles = () => {
	const [articles, setArticles] = useState([]);
	const [handleLoader, setHandleLoader] = useState(false);
	const [pageOffset, setPageOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [articlesPerPage, setArticlesPerPage] = useState(5);
	const options = [5, 10, 15, 20, 25];

	console.log(pageCount);

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
		getArticles();
		getArticlesCount();
		window.scroll(0, 0);
		// eslint-disable-next-line
	}, [pageOffset, articlesPerPage]);

	const handlePageChange = (event) => {
		setPageOffset(event.selected);
	};

	const handleSelect = (e) => {
		setArticlesPerPage(e.target.value);
	};

	return (
		<div className="articles">
			{handleLoader && <CustomLoader />}
			<div className="heading">
				<p>Articles on Space Flight</p>
				<FormControl size="small" className="selectWidth">
					<InputLabel id="articlesPerPage">Articles Per Page</InputLabel>
					<Select
						labelId="articlesPerPage"
						name="articlesPerPage"
						value={articlesPerPage}
						onChange={handleSelect}
						label="Articles Per Page"
					>
						{options.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className="articleCards">
				{articles.map((article) => (
					<Article key={article.id} article={article} />
				))}
			</div>
			<div>
				<ReactPaginate
					previousLabel="<<"
					nextLabel=">>"
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
			</div>
		</div>
	);
};

export default Articles;
