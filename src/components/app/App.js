import { useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";


const App = () => {
	const observerRef = useRef();

	return (
		<Router>
			<div className="app" >
				<AppHeader />
				<main>
					<Switch>
						<Route exact path="/">
							<MainPage observerRef={observerRef} />
						</Route>

						<Route exact path="/comics">
							<ComicsPage observerRef={observerRef} />
						</Route>
					</Switch>
				</main>
				<div
					ref={observerRef}
					className="char__footer"></div>
			</div>
		</Router>
	)
}

export default App;