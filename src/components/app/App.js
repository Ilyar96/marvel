import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";


const App = () => {
	const observerRef = useRef();

	return (
		<Router>
			<div className="app" >
				<AppHeader />
				<main>
					<Routes>
						<Route path="/" element={<MainPage observerRef={observerRef} />} />
						<Route path="/comics" element={<ComicsPage observerRef={observerRef} />} >
							//! Создаем вложенную структуру /comics/test || Для вывода дочерних элементов используем компоненнт Outlet
							<Route path="test" element={<MainPage observerRef={observerRef} />} />
						</Route>
					</Routes>
				</main>
				<div
					ref={observerRef}
					className="char__footer"></div>
			</div>
		</Router>
	)
}

export default App;