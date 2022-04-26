import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);

	const { loading, error, clearError, getCharacter } = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [charId])

	const updateChar = () => {
		if (!charId) {
			return;
		}

		clearError();
		getCharacter(charId)
			.then(onCharLoaded);
	}


	const onCharLoaded = char => setChar(char);

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info" >
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ char }) => {
	const { name, descrition, thumbnail, homepage, wiki, comics } = char;
	let comicsKey = 1;

	const comicsList = comics.map(({ name }, index) => {
		if (index > 9) return;
		return (
			<li className="char__comics-item" key={comicsKey++}>{name}</li>
		)
	})

	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{descrition}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{!comics.length ? 'Comics not found' : null}
				{comicsList}
			</ul>
		</>
	)
}

CharInfo.propTypes = {
	charId: propTypes.number
}

export default CharInfo;