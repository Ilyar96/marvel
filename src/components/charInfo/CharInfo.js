import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import useMarvelService from "../../services/MarvelService";
import setContent from '../../utils/setContent';

import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);

	const { clearError, process, setProcess, getCharacter } = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [charId])

	const updateChar = () => {
		if (!charId) {
			return;
		}

		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
			.then(() => { setProcess('confirmed') }); //! Так как получение данных происходит асинхронно  меняем состояние после получения данных 
	}


	const onCharLoaded = char => setChar(char);

	return (
		<div className="char__info" >
			{setContent(process, View, char)}
		</div>
	)
}

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data;
	let comicsKey = 1;

	const comicsList = comics.map(({ name, resourceURI }, index) => {
		if (index > 9) return;
		const comicId = resourceURI.slice(+resourceURI.indexOf('comics/') + 7);

		return (
			<li className="char__comics-item" key={comicsKey++}>
				<Link to={`/comics/${comicId}`} >{name}</Link>
			</li >
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
			<div className="char__descr">{description}</div>
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