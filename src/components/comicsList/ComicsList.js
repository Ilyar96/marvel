import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import './comicsList.scss';

const setContent = (process, Component, newItemsLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />
		case 'loading':
			return newItemsLoading ? <Component /> : < Spinner />
		case 'confirmed':
			return <Component />
		case 'error':
			return <ErrorMessage />
		default:
			throw new Error('unexpected process state')
	}
}

const ComicsList = ({ observerRef }) => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(9);
	const [comicsEnded, setComicsEnded] = useState(false);
	const [totalComics, setTotalComics] = useState(0);

	const { process, setProcess, getAllComics, getData } = useMarvelService();
	useEffect(() => {
		onRequest(offset, true);
		getData('comics', 'issueNumber=1').then(res => setTotalComics(res.total));
	}, [])

	useIntersectionObserver({
		target: observerRef,
		onIntersect: ([{ isIntersecting }], observerElement) => {
			if (isIntersecting && process !== 'loading') {
				onRequest(offset);
			}
		}
	})

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

		getAllComics(offset)
			.then(onComicsListLoaded)
			.then(() => { setProcess('confirmed') });
	}

	const onComicsListLoaded = (newComicsList) => {
		let ended = totalComics !== 0 && (totalComics - offset <= 8) ? true : false;

		setComicsList(() => [...comicsList, ...newComicsList]);
		setNewItemsLoading(() => false);
		setOffset(() => offset + 8);
		setComicsEnded(() => ended);
	}

	const renderComics = arr => {
		const items = arr.map(({ id, title, thumbnail, price }, index) => {
			let imgStyle = { 'objectFit': 'cover' };
			if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}

			return (
				<CSSTransition
					timeout={500}
					classNames="comics__item"
					key={index}
				>
					<li
						className="comics__item"
						tabIndex="0">
						<Link to={`${id}`}>
							<img src={thumbnail} alt={title} className="comics__item-img" style={imgStyle} />
							<div className="comics__item-name">{title}</div>
							<div className="comics__item-price">{price}</div>
						</Link>
					</li>
				</CSSTransition>
			)
		});

		return (
			<ul className="comics__grid">
				<TransitionGroup component={null}>
					{items}
				</TransitionGroup>
			</ul>
		)
	}

	return (
		<div className="comics__list">
			{setContent(process, () => renderComics(comicsList), newItemsLoading)}
			<button
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				style={
					{
						display: comicsEnded ||
							process === 'waiting' ||
							(process === 'loading' && !newItemsLoading) ?
							'none' : 'block'
					}
				}
				disabled={process === 'loading'}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;