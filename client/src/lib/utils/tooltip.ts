import tippy from 'tippy.js';
import type { Content, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/perspective-subtle.css';

export type Options = Partial<Props>;

export function tooltip(element: HTMLElement, content: Content) {
	const options: Options = {
		content: content,
		theme: 'current',
		placement: 'bottom',
		arrow: false,
		animation: 'perspective-subtle'
	};

	const tooltip = tippy(element, options);

	return {
		update(content: Content) {
			tooltip.setContent(content);
		},

		destroy() {
			tooltip.destroy();
		}
	};
}
