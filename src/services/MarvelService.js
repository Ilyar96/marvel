class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=399933906bdbef55916113fbc2b1a356';
	_baseOffset = 210;
	_totalCharacters = 0;

	getResource = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch url, status: ${res.status}`);
		}
		return await res.json();
	}

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`);
		this._totalCharacters = res.data.total;
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = char => {
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
}

export default MarvelService;

