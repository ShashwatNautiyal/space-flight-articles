import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Articles from "./pages/Articles/Articles";
import DetailArticle from "./pages/DetailArticle/DetailArticle";

function App() {
	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/" exact>
						<Articles />
					</Route>
					<Route path="/article/:articleId" exact>
						<DetailArticle />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
