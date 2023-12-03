export function validation(node, [id, error]) {
	const output = id === '' ? node.nextElementSibling : document.getElementById(id);

	node.addEventListener('invalid', onInvalid);
	node.addEventListener('input', onInput);

	function onInvalid() {
		output.textContent = error === '' ? node.validationMessage : error;
	}

	function onInput() {
		if (node.validationMessage == '') output.textContent = '';
	}

	return {
		destroy() {
			node.removeEventListener('invalid', onInvalid);
			node.removeEventListener('input', onInput);
		}
	};
}

export function onSubmit(event) {
	const form = event.target.closest('form');
	const valid = form.checkValidity();

	if (valid == false) {
		event.preventDefault(); // Prevents error popups
		[...form].find((e) => e.validity.valid == false)?.focus();
	}
}

export function invalidateInput(elementName, errorMessage) {
	const node = document.getElementsByName(elementName)[0];

	node.setCustomValidity(errorMessage);
	node.checkValidity();
}

export function resetValidationOnInput(node) {
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
