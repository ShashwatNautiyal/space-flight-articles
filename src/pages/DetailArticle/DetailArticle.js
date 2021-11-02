import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useHistory, useParams } from "react-router";
import Article from "../../components/Article/Article";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import axiosConfig from "../../utils/axiosConfig";
import "./DetailArticle.css";
import arrow from "../../assets/Arrow 1.svg";

const DetailArticle = () => {
	let { articleId } = useParams();
	let history = useHistory();
	const [handleLoader, setHandleLoader] = useState(false);
	const [articleDetails, setArticleDetails] = useState({
		title: "",
		imageUrl: "",
		publishedAt: "",
		updatedAt: "",
		summary: "",
		url: "",
		newsSite: "",
	});
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		getArticleDetails();
		getArticles();
		window.scroll(0, 0);
		// eslint-disable-next-line
	}, [history.location]);

	const getArticleDetails = () => {
		setHandleLoader(true);
		axiosConfig.get("/articles/" + articleId).then((response) => {
			setArticleDetails(response.data);
			setHandleLoader(false);
		});
	};

	const getArticles = () => {
		setHandleLoader(true);
		axiosConfig.get("/articles").then((response) => {
			setArticles(response.data);
			setHandleLoader(false);
		});
	};

	return (
		<div className="detailArticle">
			{handleLoader && <CustomLoader />}
			<div onClick={() => history.push("/")} className="backBtn">
				<img src={arrow} alt="" /> <span>Articles</span>
			</div>
			<div className="articleInfo">
				<p>{articleDetails.title}</p>
				<img src={articleDetails.imageUrl} alt="" />
				<div className="dates">
					<p>
						Published at- <Moment format="MMMM D, YYYY">{articleDetails.publishedAt}</Moment>
					</p>
					<p>
						Updated at- <Moment format="MMMM D, YYYY">{articleDetails.updatedAt}</Moment>
					</p>
				</div>
				<p>
					Summary- <span>{articleDetails.summary}</span>
				</p>
				<p>
					Article link-{" "}
					<a target="_blank" rel="noreferrer" href={articleDetails.url}>
						{articleDetails.newsSite}
					</a>
				</p>
			</div>
			<div className="relatedArticles">
				<p>Related Articles</p>
				<div className="articleCards">
					{articles.map((article) => (
						<Article key={article.id} article={article} />
					))}
				</div>
			</div>
		</div>
	);
};

export default DetailArticle;
