import type { User } from './user';

declare global {
	interface String {
		toUser(): User;
	}
}

String.prototype.toUser = function (): User {
	let initials = '';
	let avatar = '';

	const user: User = JSON.parse(this.toString());

	const firstName = user.firstName === undefined ? '' : user.firstName[0];
	const lastName = user.lastName === undefined ? '' : user.lastName[0];
	initials = `${firstName[0]}${lastName[0]}`;

	const contentType = user.image === undefined || user.image === null ? '' : user.image.contentType;
	const data = user.image === undefined || user.image === null ? '' : user.image.data;

	if (contentType && data) {
		avatar = `data:${contentType};base64,${data}`;
	}

	user.initials = initials;
	user.avatar = avatar;

	return user;
};
