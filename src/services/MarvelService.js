import { useHttp } from '../hooks/http.hook';


const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=399933906bdbef55916113fbc2b1a356';
	const _baseOffset = 210;

	const getAllComics = async (offset = 0) => {
		const res = await request(`${_apiBase}comics?limit=8&issueNumber=1&offset=${offset}&${_apiKey}`);

		return res.data.results.map(_transformComic);
	}

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

		return res.data.results.map(_transformCharacter);
	}

	const getData = async (value = 'characters', addParams = '') => {
		const res = await request(`${_apiBase}/${value}?${addParams}&${_apiKey}`);

		return res.data;
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const _transformCharacter = char => {
		return {
			id: char.id,
			name: char.name,
			descrition: char.descrition ? char.descrition.slice(0, 220) : 'Description not found',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[0].url,
			comics: char.comics.items
		}
	}
	const _transformComic = comic => {
		return {
			id: comic.id,
			title: comic.title,
			descrition: comic.descrition ? comic.descrition.slice(0, 220) : 'Description not found',
			thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
			homepage: comic.urls[0].url,
			price: comic.prices[0].price === 0 ? 'No price' : comic.prices[0].price + '$'
		}
	}

	return {
		loading,
		error,
		clearError,
		getData,
		getAllCharacters,
		getCharacter,
		getAllComics
	}
}

export default useMarvelService;

