import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../service/MarvelService";

import decoration from '../../resources/img/vision.png';

const marvelService = new MarvelService();

marvelService.getAllCharacters().then(res => console.log(res.data.results));
marvelService.getCharacter(1011052).then(res => console.log(res));

const App = () => {
	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<CharList />
					<CharInfo />
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	)
}

export default App;