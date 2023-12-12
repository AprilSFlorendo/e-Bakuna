export interface User {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	initials: string;
	role: string;
	avatar: string;
	image: {
		data: string;
		contentType: string;
		fileName: string;
	};
}
