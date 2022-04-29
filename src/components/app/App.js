import { useRef, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/singleComicPage/SingleComicPage"));



const App = () => {
	const observerRef = useRef();

	return (
		<Router>
			<div className="app" >
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage observerRef={observerRef} />} />
							<Route path="/comics" element={<ComicsPage observerRef={observerRef} />} />
							<Route path="/comics/:comicId" element={<SingleComicPage />} />
							<Route path="*" element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
				<div
					ref={observerRef}
					className="char__footer"></div>
			</div>
		</Router>
	)
}

export default App;