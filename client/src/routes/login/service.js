import { PUBLIC_BASE_API } from '$env/static/public';

export async function login(username = '', password = '') {
	try {
		const encodedUsername = encodeURIComponent(username);
		const encodedPassword = encodeURIComponent(password);
		const url = `${PUBLIC_BASE_API}/api/users/login?username=${encodedUsername}&password=${encodedPassword}`;

		const res = await fetch(url);

		const body = await res.json();
		if (res.ok) {
			return { status: res.status, body: body };
		}

		return { status: body.statusCode, statusText: body.errors.generalErrors[0] };
	} catch (error) {
		return { error: 'Unable to connect to the server' };
	}
}
