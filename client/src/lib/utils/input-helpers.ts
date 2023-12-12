export function validation(node: HTMLInputElement, [id = '', error = '']) {
	const output: Node | null = id === '' ? node.nextElementSibling : document.getElementById(id);

	node.addEventListener('invalid', onInvalid);
	node.addEventListener('input', onInput);

	function onInvalid() {
		if (!output) return;

		output.textContent = error === '' ? node?.validationMessage : error;
	}

	function onInput() {
		if (!output) return;

		if (node.validationMessage == '') output.textContent = '';
	}

	return {
		destroy() {
			node.removeEventListener('invalid', onInvalid);
			node.removeEventListener('input', onInput);
		}
	};
}

export function onSubmit(event: MouseEvent) {
	const element = event?.target as HTMLInputElement;
	const form = element.closest('form');

	if (!form) return;

	const valid = form.checkValidity();

	if (valid == false) {
		event.preventDefault(); // Prevents error popups

		const input = [...form].find((e) => {
			const node = e as HTMLInputElement;
			return node.validity.valid == false;
		}) as HTMLInputElement;

		input?.focus();
	}
}

export function invalidateInput(elementName: string, errorMessage: string) {
	const node = document.getElementsByName(elementName)[0] as HTMLInputElement;

	node.setCustomValidity(errorMessage);
	node.checkValidity();
}

export function resetValidationOnInput(node: HTMLInputElement) {
	node.addEventListener('input', onInput);

	function onInput() {
		node.setCustomValidity('');
		node.checkValidity();
	}

	return {
		destroy() {
			node.removeEventListener('input', onInput);
		}
	};
}

export function focusOnClick(node: HTMLElement, id: string) {
	const input = document.getElementById(id) as HTMLInputElement;

	node.addEventListener('click', onClick);

	function onClick() {
		if (!input) return;

		input.focus();
	}

	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
}

export function clearOnClick(node: HTMLElement, id: string) {
	const input = document.getElementById(id) as HTMLInputElement;

	node.addEventListener('click', onClick);

	function onClick() {
		if (!input) return;

		input.value = '';
	}

	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
}
