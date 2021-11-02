import Moment from "react-moment";
import { useHistory } from "react-router";
import "./Article.css";

const Article = ({ article }) => {
	const history = useHistory();

	return (
		<div onClick={() => history.push(`/${article.id}`)} className="article">
			<Moment format="MMMM D, YYYY">{article.updatedAt}</Moment>
			<p>{article.title}</p>
			<p>{article.summary}</p>
		</div>
	);
};

export default Article;
