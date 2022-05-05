import { useEffect } from "react";

const useIntersectionObserver = ({
	target,
	onIntersect,
	rootMargin = '0px',
	threshold = 1
}) => {
	useEffect(() => {
		const observer = new IntersectionObserver(onIntersect, {
			rootMargin,
			threshold
		});
		const current = target.current;

		observer.observe(current);

		return () => {
			observer.unobserve(current);
		};
	});
}

export default useIntersectionObserver;

// ! Для решения проблем со сдвигом окна до конца страницы и дозагрузки безконечной использовал для main css свойство overflow-anchor: none;