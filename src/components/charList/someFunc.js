//При дефолтном экспорте создается объект со свойством default
export default function defaultLogger() {
	console.log('defaultLogger');
}

//При таком экспорте создается объект со свойством logger
export function logger() {
	console.log('Hello world');
}

export function secondLog() {
	console.log('2nd');
}