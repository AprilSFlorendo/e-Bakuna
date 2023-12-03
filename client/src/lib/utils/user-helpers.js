export function parseUser(user) {
	let initials = '';
	let image = '';

	const parsed = JSON.parse(user);

	const firstName = parsed.firstName === undefined ? '' : parsed.firstName[0];
	const lastName = parsed.lastName === undefined ? '' : parsed.lastName[0];
	initials = `${firstName[0]}${lastName[0]}`;

	const contentType =
		parsed.image === undefined || parsed.image === null ? '' : parsed.image.contentType;
	const data = parsed.image === undefined || parsed.image === null ? '' : parsed.image.data;

	if (contentType && data) {
		image = `data:${contentType};base64,${data}`;
	} else {
		image = '';
	}

	return { initials, image };
}
