import { PUBLIC_BASE_API } from '$env/static/public';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		{
			const formData = await request.formData();
			const username = formData.get('username')?.toString() ?? '';
			const password = formData.get('password')?.toString() ?? '';

			try {
				const encodedUsername = encodeURIComponent(username);
				const encodedPassword = encodeURIComponent(password);
				const api = `${PUBLIC_BASE_API}/api/users/login?username=${encodedUsername}&password=${encodedPassword}`;

				const signal = request.signal;
				const response = await fetch(api, { signal });

				if (response.ok) {
					const { token, user } = await response.json();

					cookies.set('token', token, {
						path: '/',
						httpOnly: true,
						secure: true,
						maxAge: 60 * 60 * 24 * 7
					});

					return { user };
				} else {
					const body = await response.json();

					return fail(body.statusCode, {
						message: body.errors.generalErrors[0],
						username,
						password
					});
				}
			} catch {
				return fail(500, { message: 'Internal Server Error', username, password });
			}
		}
	}
};
