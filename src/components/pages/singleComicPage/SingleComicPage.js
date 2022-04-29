import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleComic.scss';

const SingleComicPage = () => {
	const [comic, setComic] = useState(null);

	const { comicId } = useParams();
	const { loading, error, clearError, getComic } = useMarvelService();

	let navigate = useNavigate();

	useEffect(() => {
		updateComic();
	}, [comicId])

	const updateComic = () => {
		clearError();
		getComic(comicId)
			.then(onComicLoaded);
	}

	const onComicLoaded = comic => setComic(comic);

	const errorMessage = error ? <ErrorMessage /> : null;
	const goBackLink = error ?
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<button
				onClick={() => navigate(-1)}
				type='button'
				className='single-comic__back'
				style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Go back</button>
		</div> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comic) ? <View comic={comic} /> : null

	return (
		<>
			{errorMessage}
			{goBackLink}
			{spinner}
			{content}
		</>
	)
}

const View = ({ comic }) => {
	const {
		thumbnail,
		title,
		description,
		price,
		language,
		pageCount
	} = comic;

	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}

	return (
		<div className="single-comic">
			<img
				src={thumbnail}
				style={imgStyle}
				alt={title}
				className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount} pages</p>
				<p className="single-comic__descr">{language ? language : null}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;