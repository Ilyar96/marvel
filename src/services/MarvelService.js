import { useHttp } from '../hooks/http.hook';


const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=399933906bdbef55916113fbc2b1a356';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);

		return res.data.results.map(_transformCharacter);
	}

	const getTotalCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}/characters?${_apiKey}`);

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

	return { loading, error, clearError, getTotalCharacters, getAllCharacters, getCharacter }
}

export default useMarvelService;

