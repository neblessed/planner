import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	handler: (event: MouseEvent | TouchEvent | KeyboardEvent) => void,
) {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};

		const escapeListener = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handler(event);
			}
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		document.addEventListener('keyup', escapeListener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
			document.removeEventListener('keyup', escapeListener);
		};
	}, [ref, handler]);
}
