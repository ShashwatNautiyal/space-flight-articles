import Moment from "react-moment";
import { Link } from "react-router-dom";
import "./Article.css";

const Article = ({ article }) => {
	return (
		<div className="article">
			<Link target="_blank" to={`/article/${article.id}`}>
				<Moment format="MMMM D, YYYY">{article.updatedAt}</Moment>
				<p>{article.title}</p>
				<p>{article.summary}</p>
			</Link>
		</div>
	);
};

export default Article;
