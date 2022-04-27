import { useState, useRef } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList"

import decoration from '../../resources/img/vision.png';

const App = () => {
	const [selectedChar, setChar] = useState(null);
	const observerRef = useRef();

	const onCharSelected = (id) => {
		setChar(id)
	}

	return (
		<div className="app" >
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<ErrorBoundary>
						<CharList onCharSelected={onCharSelected} observerRef={observerRef} />
					</ErrorBoundary>
					<aside>
						<ErrorBoundary>
							<CharInfo charId={selectedChar} />
						</ErrorBoundary>
					</aside>
				</div>
				{/* <ErrorBoundary>
					<ComicsList observerRef={observerRef} />
				</ErrorBoundary> */}

				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
			<div
				ref={observerRef}
				className="char__footer"></div>
		</div>
	)
}

export default App;