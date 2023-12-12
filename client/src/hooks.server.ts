import { PUBLIC_BASE_API } from '$env/static/public';

export async function handle({ event, resolve }) {
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

	if (event.request.url.includes('/login')) {
		const response = await resolve(event);
		return response;
	}

	try {
		const token = event.cookies.get('token');

		if (!token) {
			return redirectToLogin();
		}

		const res = await fetch(`${PUBLIC_BASE_API}/api/users/refresh-token`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (res.ok) {
			const response = await resolve(event);
			return response;
		} else {
			return redirectToLogin();
		}
	} catch (error) {
		return redirectToLogin();
	}

	function redirectToLogin() {
		const redirect = event.request.url.split('/').slice(3).join('/');
		const encodedRedirect = encodeURIComponent(redirect);

		const baseUrl = event.request.url.split('/').slice(0, 3).join('/');
		const defaultLoginUrl = `${baseUrl}/login`;
		const redirectLoginUrl = `${baseUrl}/login?redirectUrl=${encodedRedirect}`;
		const redirectUrl = redirect ? redirectLoginUrl : defaultLoginUrl;

		return Response.redirect(redirectUrl, 303);
	}
}
