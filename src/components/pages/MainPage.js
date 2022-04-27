import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = ({ observerRef }) => {
	const [selectedChar, setChar] = useState(null);
	const onCharSelected = (id) => {
		setChar(id)
	}

	return (
		<>
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
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage;