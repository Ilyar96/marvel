import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import nextId from "react-id-generator";

import './comicsList.scss';

const ComicsList = ({ observerRef }) => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(9);
	const [comicsEnded, setComicsEnded] = useState(false);
	const [totalComics, setTotalComics] = useState(0);

	const { loading, error, getAllComics, getData } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		getData('comics', 'issueNumber=1').then(res => setTotalComics(res.total));
	}, [])

	useIntersectionObserver({
		target: observerRef,
		onIntersect: ([{ isIntersecting }], observerElement) => {
			if (isIntersecting && !loading) {
				onRequest(offset);
			}
		}
	})

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

		getAllComics(offset)
			.then(onComicsListLoaded);
	}

	const onComicsListLoaded = (newComicsList) => {
		let ended = totalComics !== 0 && (totalComics - offset <= 8) ? true : false;

		setComicsList(() => [...comicsList, ...newComicsList]);
		setNewItemsLoading(() => false);
		setOffset(() => offset + 8);
		setComicsEnded(() => ended);
	}

	const renderComics = arr => {
		const items = arr.map(({ title, thumbnail, price }) => {
			let imgStyle = { 'objectFit': 'cover' };
			if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}

			return <li
				className="comics__item"
				key={nextId()}
				tabIndex="0">
				<a href="#">
					<img src={thumbnail} alt={title} className="comics__item-img" style={imgStyle} />
					<div className="comics__item-name">{title}</div>
					<div className="comics__item-price">{price}</div>
				</a>
			</li>
		});

		return (
			<ul className="comics__grid">
				{items}
			</ul>
		)
	}

	const spinner = loading && !newItemsLoading ? <Spinner /> : null;
	const errorMessage = !loading && error ? <ErrorMessage /> : null;
	const items = renderComics(comicsList);

	return (
		<div className="comics__list">
			{spinner}
			{errorMessage}
			{items}
			<button
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				style={{ display: comicsEnded ? 'none' : 'block' }}
				disabled={newItemsLoading}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;