import { useRef, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));



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
							<Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType={'comic'} />} />
							<Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character' />} />
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