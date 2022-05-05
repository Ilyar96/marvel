import { useState, useEffect, useRef, useMemo } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import propTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './charList.scss';

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

const CharList = ({ onCharSelected, observerRef }) => {
	const [charList, setCharList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	const [totalCharacters, setTotalCharacters] = useState(0);

	const { process, setProcess, getData, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		getData().then(res => setTotalCharacters(res.total));
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
		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(() => { setProcess('confirmed') });
	}

	const focusOnItem = id => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const onCharListLoaded = (newCharList) => {
		let ended = totalCharacters !== 0 && (totalCharacters - offset <= 9) ? true : false;

		setCharList(() => [...charList, ...newCharList]);
		setNewItemsLoading(() => false);
		setOffset(() => offset + 9);
		setCharEnded(() => ended);
	}

	const itemRefs = useRef([]);

	const renderItems = arr => {
		const items = arr.map((item, i) => {
			let imgStyle = { 'objectFit': 'cover' };
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}

			return (
				<CSSTransition
					timeout={500}
					classNames="char__item"
					key={item.id}
				>
					<li
						className="char__item"
						ref={el => itemRefs.current[i] = el}
						tabIndex="0"
						onClick={() => {
							onCharSelected(item.id);
							focusOnItem(i);
						}}
						onKeyPress={(e) => {
							if (e.key === ' ' || e.key === "Enter") {
								onCharSelected(item.id);
								focusOnItem(i);
							}
						}}>
						<img src={item.thumbnail} alt={item.name} style={imgStyle} />
						<div className="char__name">{item.name}</div>
					</li>
				</CSSTransition>
			)
		});
		return (
			<ul className="char__grid">
				<TransitionGroup component={null}>
					{items}
				</TransitionGroup>
			</ul>
		)
	}

	const elements = useMemo(() => {
		return setContent(process, () => renderItems(charList), newItemsLoading);
	}, [process])

	return (
		<div className="char__list">
			{elements}
			<button
				className="button button__main button__long"
				disabled={newItemsLoading}
				style={
					{
						display: charEnded ||
							process === 'waiting' ||
							(process === 'loading' && !newItemsLoading) ?
							'none' : 'block'
					}
				}
				onClick={() => { onRequest(offset) }}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharSelected: propTypes.func.isRequired
}

export default CharList;