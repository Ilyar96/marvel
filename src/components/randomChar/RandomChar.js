import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from "../../service/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	constructor(props) {
		super(props);
		this.updateChar();
	}

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render() {
		const { char, loading, error } = this.state;

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <View char={char} /> : null;

		//Условный рендеринг - когда загружаем какой-то компонент из условия
		// if (loading) {
		// 	return <Spinner></Spinner>
		// }
		return (
			<div className="randomchar" >
				{spinner}
				{errorMessage}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, descrition, thumbnail, homepage, wiki } = char;

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{descrition}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main" target="_blank">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary" target="_blank">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;